import {
  getWeeklyRevenues,
  createRevenueService,
  updateRevenueService,
  getRevenueDashboardService,
} from "../services/revenueService.js";

const ALLOWED_FIELDS = [
  "date",
  "posRevenue",
  "eatclubRevenue",
  "labourCosts",
  "directRevenue",
  "totalCovers",
];

export async function getWeeklyRevenuesController(req, res) {
  try {
    const { date } = req.query;

    // Validate the date format
    if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        success: false,
        message: "Date must use YYYY-MM-DD format",
      });
    }

    // Validate that the date exists on the calendar
    const parsedDate = new Date(`${date}T00:00:00.000Z`);

    if (
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== date
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid date",
      });
    }

    // Get weekly revenue data from the service
    const result = await getWeeklyRevenues(date);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Get weekly revenues error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function createRevenueController(req, res) {
  try {
    const {
      date,
      posRevenue,
      eatclubRevenue,
      labourCosts,
      directRevenue,
      totalCovers,
    } = req.body;

    // Validate the date format
    if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        success: false,
        message: "Date must use YYYY-MM-DD format",
      });
    }

    // Validate that the date exists on the calendar
    const parsedDate = new Date(`${date}T00:00:00.000Z`);

    if (
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== date
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid date",
      });
    }

    // Validate numeric fields
    const numericFields = {
      posRevenue,
      eatclubRevenue,
      labourCosts,
      directRevenue,
      totalCovers,
    };

    for (const [field, value] of Object.entries(numericFields)) {
      if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
        return res.status(400).json({
          success: false,
          message: `${field} must be a non-negative number`,
        });
      }
    }

    // Validate totalCovers as an integer
    if (!Number.isInteger(totalCovers)) {
      return res.status(400).json({
        success: false,
        message: "totalCovers must be an integer",
      });
    }

    // Create the revenue record
    const revenue = await createRevenueService({
      date,
      posRevenue,
      eatclubRevenue,
      labourCosts,
      directRevenue,
      totalCovers,
    });

    return res.status(201).json({
      success: true,
      message: "Revenue created successfully",
      data: revenue,
    });
  } catch (error) {
    // Handle duplicate dates and other known errors
    if (error.statusCode === 409) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Create revenue error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function updateRevenueController(req, res) {
  try {
    const { id } = req.params;
    const payload = {};

    // Reject an invalid record ID
    if (!/^[1-9]\d*$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid revenue ID",
      });
    }

    // Keep only fields that can be updated
    for (const field of ALLOWED_FIELDS) {
      if (Object.hasOwn(req.body, field)) {
        payload[field] = req.body[field];
      }
    }

    if (Object.keys(payload).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No valid fields provided for update",
      });
    }

    // Validate numeric fields
    const numericFields = [
      "posRevenue",
      "eatclubRevenue",
      "labourCosts",
      "directRevenue",
      "totalCovers",
    ];

    for (const field of numericFields) {
      if (Object.hasOwn(payload, field)) {
        const value = payload[field];

        if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
          return res.status(400).json({
            success: false,
            message: `${field} must be a non-negative number`,
          });
        }
      }
    }

    // Validate totalCovers as an integer
    if (
      Object.hasOwn(payload, "totalCovers") &&
      !Number.isInteger(payload.totalCovers)
    ) {
      return res.status(400).json({
        success: false,
        message: "totalCovers must be an integer",
      });
    }

    // Validate the date if it is being updated
    if (Object.hasOwn(payload, "date")) {
      const { date } = payload;

      if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return res.status(400).json({
          success: false,
          message: "Date must use YYYY-MM-DD format",
        });
      }

      const parsedDate = new Date(`${date}T00:00:00.000Z`);

      if (
        Number.isNaN(parsedDate.getTime()) ||
        parsedDate.toISOString().slice(0, 10) !== date
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid date",
        });
      }
    }

    // Update the revenue record
    const revenue = await updateRevenueService(Number(id), payload);

    return res.status(200).json({
      success: true,
      message: "Revenue updated successfully",
      data: revenue,
    });
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Update revenue error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function getRevenueDashboardController(req, res) {
  try {
    // Use today's date when no date is provided.
    const date = req.query.date ?? new Date().toISOString().slice(0, 10);

    // Validate the date format.
    if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({
        success: false,
        message: "Date must use YYYY-MM-DD format",
      });
    }

    // Validate that the date exists on the calendar.
    const parsedDate = new Date(`${date}T00:00:00.000Z`);

    if (
      Number.isNaN(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== date
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid date",
      });
    }

    const result = await getRevenueDashboardService(date);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Get revenue dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
