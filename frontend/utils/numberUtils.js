export function formatNumber(value) {
  return value === "" ||
    value === null ||
    value === undefined ||
    value === 0 ||
    value === "0" ||
    value === "0.00"
    ? "—"
    : Number(value).toLocaleString("en-US");
}
