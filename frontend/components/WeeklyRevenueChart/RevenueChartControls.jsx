import { Download } from "lucide-react";

const SERIES = [
  { key: "pos", label: "POS Revenue", color: "#252525" },
  { key: "eatclub", label: "Eatclub Revenue", color: "#5c4ce0" },
  { key: "labour", label: "Labour Costs", color: "#df5d37" },
  { key: "posPrev", label: "POS Revenue (Previous)", color: "#c8c8c6" },
  { key: "eatclubPrev", label: "Eatclub Revenue (Previous)", color: "#aaa0eb" },
  { key: "labourPrev", label: "Labour Costs (Previous)", color: "#f0c7ba" },
];

export const RevenueChartControls = ({
  setCompare,
  compare,
  toggleSeries,
  exportPng,
  exporting,
  visible,
}) => {
  return (
    <div className="mb-5 flex flex-col gap-4 2xl:flex-row 2xl:items-start 2xl:justify-between">
      <h1 className="shrink-0 text-[18px] font-semibold leading-snug tracking-[-0.025em]">
        This Week&apos;s Revenue Trend vs
        <br className="hidden sm:block" /> Previous Period
      </h1>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        {SERIES.slice(0, 3).map((item) => (
          <label
            key={item.key}
            className="flex cursor-pointer items-center gap-2 whitespace-nowrap text-[12px] text-[#555550]"
          >
            <input
              type="checkbox"
              checked={visible[item.key]}
              onChange={() => toggleSeries(item.key)}
              className="h-4 w-4 cursor-pointer accent-[#292929]"
            />
            <span
              className="h-[2px] w-3"
              style={{ backgroundColor: item.color }}
            />
            {item.label}
          </label>
        ))}
        <button
          type="button"
          onClick={() => setCompare((value) => !value)}
          className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-[12px] font-semibold transition ${compare ? "bg-[#292929] text-white hover:bg-black" : "border border-[#dededb] bg-yellow-300 text-[#555550]"}`}
        >
          <span aria-hidden="true">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.25"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 3v16a2 2 0 0 0 2 2h16" />
              <path d="M18 17V9" />
              <path d="M13 17V5" />
              <path d="M8 17v-3" />
            </svg>
          </span>{" "}
          Compare to Previous
        </button>
        <button
          type="button"
          onClick={exportPng}
          disabled={exporting}
          className="inline-flex items-center gap-2 rounded-full border border-[#dededb] bg-[#f8f7f5] px-3 py-2 text-[12px] font-medium text-[#333330] transition hover:bg-[#efeeeb] disabled:cursor-wait disabled:opacity-60"
        >
          <span aria-hidden="true">
            <Download size={16} strokeWidth={1.8} />
          </span>{" "}
          {exporting ? "Exporting..." : "Export PNG"}
        </button>
      </div>
    </div>
  );
};
