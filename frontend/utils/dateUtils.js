export function toISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getWeekRange(dateString) {
  if (!dateString) return "";

  // Parse the input date string (YYYY-MM-DD) into a Date object
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  const monday = new Date(date);
  const dayOfWeek = monday.getDay();

  // Set the date to the previous Monday
  monday.setDate(monday.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const formatDate = (value) =>
    value.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

  const formatYear = (value) => value.getFullYear();

  return `${formatDate(monday)} - ${formatDate(sunday)}, ${formatYear(sunday)}`;
}
