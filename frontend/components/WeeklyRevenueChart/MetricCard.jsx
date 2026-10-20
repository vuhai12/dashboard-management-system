export const MetricCard = ({
  label,
  value,
  comparison,
  percentageChange,
  direction,
  compare,
}) => {
  return (
    <div className="rounded-2xl bg-[#f7f6f4] px-4 py-3">
      <p className="mb-1 text-[12px] font-medium text-[#555550]">{label}</p>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="text-[20px] font-semibold tracking-[-0.04em]">{value}</p>
        {compare && (
          <p className="text-[12px] text-[#555550]">
            vs {comparison}{" "}
            <span
              className={`font-semibold ${direction === "increase" ? "text-green-500" : direction === "decrease" ? "text-red-500" : "text-gray-500"}`}
            >
              ( {percentageChange != null ? percentageChange + "%" : "N/A"} )
            </span>
          </p>
        )}
      </div>
    </div>
  );
};
