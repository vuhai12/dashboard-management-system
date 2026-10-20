import { formatCurrency } from "@/utils/formatCurrency";

export const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="min-w-[180px] rounded-xl border border-[#e9e9e6] bg-white p-3 shadow-lg">
      <p className="mb-2 text-xs font-semibold">{label}</p>
      <div className="space-y-1.5">
        {payload.map((entry) => (
          <div
            key={entry.dataKey}
            className="flex items-center justify-between gap-4 text-[11px]"
          >
            <span className="flex items-center gap-2 text-[#777774]">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  background: entry.color,
                  opacity: entry.dataKey.toLowerCase().includes("prev")
                    ? 0.3
                    : 1,
                }}
              />
              {entry.name}
            </span>
            <span className="font-medium">{formatCurrency(entry.value)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomTooltip;
