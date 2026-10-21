import { Op } from "sequelize";
import Revenue from "../models/Revenue.js";

const DAY_NAMES_BY_UTC_DAY = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export async function getWeeklyRevenues(dateInput) {
  // Parse the selected date in UTC
  const selectedDate = new Date(`${dateInput}T00:00:00.000Z`);

  // Calculate the Monday of the selected week
  const monday = new Date(selectedDate);
  const daysFromMonday = (selectedDate.getUTCDay() + 6) % 7;

  monday.setUTCDate(monday.getUTCDate() - daysFromMonday);

  // Calculate the Sunday of the selected week
  const sunday = new Date(monday);
  sunday.setUTCDate(sunday.getUTCDate() + 6);

  // Format the date as YYYY-MM-DD
  const formatDate = (date) => date.toISOString().slice(0, 10);

  const weekStart = formatDate(monday);
  const weekEnd = formatDate(sunday);

  // Fetch existing revenue records for the selected week
  const revenues = await Revenue.findAll({
    where: {
      date: {
        [Op.between]: [weekStart, weekEnd],
      },
    },
    order: [["date", "ASC"]],
  });

  // Map existing records by date
  const revenueByDate = new Map(
    revenues.map((revenue) => [
      formatDate(new Date(`${revenue.date}T00:00:00.000Z`)),
      revenue,
    ]),
  );

  // Generate all seven days of the selected week
  const data = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(monday);
    currentDate.setUTCDate(monday.getUTCDate() + i);

    const date = formatDate(currentDate);
    const revenue = revenueByDate.get(date);

    data.push({
      id: revenue?.id ?? null,
      date,
      dayOfWeek: DAY_NAMES_BY_UTC_DAY[currentDate.getUTCDay()],
      hasData: Boolean(revenue),

      posRevenue: revenue?.posRevenue ?? 0,
      eatclubRevenue: revenue?.eatclubRevenue ?? 0,
      labourCosts: revenue?.labourCosts ?? 0,
      directRevenue: revenue?.directRevenue ?? 0,
      totalCovers: revenue?.totalCovers ?? 0,
    });
  }

  return {
    weekStart,
    weekEnd,
    data,
  };
}

export async function createRevenueService(payload) {
  const {
    date,
    posRevenue,
    eatclubRevenue,
    labourCosts,
    directRevenue,
    totalCovers,
  } = payload;

  // Check whether a revenue record already exists for this date
  const existingRevenue = await Revenue.findOne({
    where: { date },
  });

  if (existingRevenue) {
    const error = new Error("Revenue data already exists for this date");
    error.statusCode = 409;
    throw error;
  }

  // Create a new revenue record in the database
  const revenue = await Revenue.create({
    date,
    posRevenue,
    eatclubRevenue,
    labourCosts,
    directRevenue,
    totalCovers,
  });

  return revenue;
}

export async function updateRevenueService(id, payload) {
  // Find the revenue record by ID
  const revenue = await Revenue.findByPk(id);

  if (!revenue) {
    const error = new Error("Revenue record not found");
    error.statusCode = 404;
    throw error;
  }

  // Update the provided fields
  await revenue.update(payload);

  return revenue;
}

export async function getRevenueDashboardService(dateInput) {
  const WEEKDAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const formatDate = (date) => date.toISOString().slice(0, 10);

  // Calculate the Monday of the current week.
  const selectedDate = new Date(`${dateInput}T00:00:00.000Z`);
  const currentMonday = new Date(selectedDate);
  const daysFromMonday = (selectedDate.getUTCDay() + 6) % 7;

  currentMonday.setUTCDate(currentMonday.getUTCDate() - daysFromMonday);

  // Calculate the Monday of the previous week.
  const previousMonday = new Date(currentMonday);
  previousMonday.setUTCDate(previousMonday.getUTCDate() - 7);

  // Calculate the Sunday of the current week.
  const currentSunday = new Date(currentMonday);
  currentSunday.setUTCDate(currentSunday.getUTCDate() + 6);

  const currentWeekEnd = formatDate(currentSunday);
  const previousWeekStart = formatDate(previousMonday);

  // Fetch both weeks in a single query.
  const revenues = await Revenue.findAll({
    where: {
      date: {
        [Op.between]: [previousWeekStart, currentWeekEnd],
      },
    },
    order: [["date", "ASC"]],
  });

  // Index records by date for quick lookup.
  const revenueByDate = new Map(
    revenues.map((revenue) => [
      formatDate(new Date(`${revenue.date}T00:00:00.000Z`)),
      revenue,
    ]),
  );

  // Convert a database value to a number.
  const getNumber = (value) => Number(value ?? 0);

  // Get revenue for a date, using zero when no record exists.
  const getDayRevenue = (date) => {
    const revenue = revenueByDate.get(date);

    if (!revenue) {
      return {
        posRevenue: 0,
        eatclubRevenue: 0,
        labourCosts: 0,
        directRevenue: 0,
        totalCovers: 0,
        totalRevenue: 0,
        hasData: false,
      };
    }

    const posRevenue = getNumber(revenue.posRevenue);
    const eatclubRevenue = getNumber(revenue.eatclubRevenue);
    const labourCosts = getNumber(revenue.labourCosts);
    const directRevenue = getNumber(revenue.directRevenue);
    const totalCovers = getNumber(revenue.totalCovers);

    return {
      posRevenue,
      eatclubRevenue,
      labourCosts,
      directRevenue,
      totalCovers,
      totalRevenue: posRevenue + eatclubRevenue + directRevenue,
      hasData: true,
    };
  };

  const currentDays = [];
  const previousDays = [];

  // Build the seven days of both weeks.
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(currentMonday);
    currentDate.setUTCDate(currentMonday.getUTCDate() + i);

    const previousDate = new Date(previousMonday);
    previousDate.setUTCDate(previousMonday.getUTCDate() + i);

    const currentDateString = formatDate(currentDate);
    const previousDateString = formatDate(previousDate);

    currentDays.push({
      date: currentDateString,
      day: WEEKDAY_NAMES[i],
      ...getDayRevenue(currentDateString),
    });

    previousDays.push({
      date: previousDateString,
      day: WEEKDAY_NAMES[i],
      ...getDayRevenue(previousDateString),
    });
  }

  // Combine current-week and previous-week values by weekday.
  const data = currentDays.map((current, index) => {
    const previous = previousDays[index];

    return {
      day: current.day,
      date: current.date,
      pos: current.posRevenue,
      eatclub: current.eatclubRevenue,
      labour: current.labourCosts,
      posPrev: previous.posRevenue,
      eatclubPrev: previous.eatclubRevenue,
      labourPrev: previous.labourCosts,
    };
  });

  // Sum the metrics for each week.
  const calculateSummary = (days) =>
    days.reduce(
      (totals, day) => {
        totals.posRevenue += day.posRevenue;
        totals.eatclubRevenue += day.eatclubRevenue;
        totals.directRevenue += day.directRevenue;
        totals.labourCosts += day.labourCosts;
        totals.totalRevenue += day.totalRevenue;
        totals.totalCovers += day.totalCovers;

        return totals;
      },
      {
        posRevenue: 0,
        eatclubRevenue: 0,
        directRevenue: 0,
        labourCosts: 0,
        totalRevenue: 0,
        totalCovers: 0,
      },
    );

  const current = calculateSummary(currentDays);
  const previous = calculateSummary(previousDays);

  current.averagePerDay = Number((current.totalRevenue / 7).toFixed(2));
  previous.averagePerDay = Number((previous.totalRevenue / 7).toFixed(2));

  // Calculate the difference and percentage change.
  const compare = (currentValue, previousValue) => {
    const difference = Number((currentValue - previousValue).toFixed(2));
    const percentageChange =
      previousValue === 0
        ? null
        : Number(((difference / previousValue) * 100).toFixed(2));

    return {
      current: Number(currentValue.toFixed(2)),
      previous: Number(previousValue.toFixed(2)),
      percentageChange:
        percentageChange === null
          ? null
          : percentageChange > 0
            ? `+${percentageChange}`
            : `${percentageChange}`,
      direction:
        difference > 0 ? "increase" : difference < 0 ? "decrease" : "unchanged",
    };
  };

  const summary = {
    totalRevenue: compare(current.totalRevenue, previous.totalRevenue),
    averagePerDay: compare(current.averagePerDay, previous.averagePerDay),
    totalCovers: compare(current.totalCovers, previous.totalCovers),
  };

  return {
    data,
    summary,
  };
}
