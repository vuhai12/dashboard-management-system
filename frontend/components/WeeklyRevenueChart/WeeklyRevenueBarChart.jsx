import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import { EventMarker } from "../RevenueManagement/EventMarker";

const SERIES = [
  { key: "pos", label: "POS Revenue", color: "#252525" },
  { key: "eatclub", label: "Eatclub Revenue", color: "#5c4ce0" },
  { key: "labour", label: "Labour Costs", color: "#df5d37" },
  { key: "posPrev", label: "POS Revenue (Previous)", color: "#c8c8c6" },
  { key: "eatclubPrev", label: "Eatclub Revenue (Previous)", color: "#aaa0eb" },
  { key: "labourPrev", label: "Labour Costs (Previous)", color: "#f0c7ba" },
];

export const WeeklyRevenueBarChart = ({
  compare,
  setCompare,
  toggleSeries,
  visible,
  selectedRevenueDataDashboard,
}) => {
  return (
    <div className="h-[290px] w-full sm:h-[340px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={selectedRevenueDataDashboard}
          margin={{ top: 8, right: 4, left: -14, bottom: 0 }}
          barGap={3}
          barCategoryGap="18%"
        >
          <CartesianGrid
            stroke="#e7e7e4"
            strokeDasharray="2 5"
            vertical={true}
            horizontal={true}
          />
          <XAxis
            dataKey="day"
            tick={{ fill: "#777774", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickMargin={10}
          />

          <YAxis
            tickFormatter={(value) => (value === 0 ? "0k" : `${value / 1000}k`)}
            tick={{ fill: "#92928f", fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            width={42}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f7f7f5" }} />
          <ReferenceDot
            x="Fri"
            y={2580}
            r={0}
            isFront
            ifOverflow="visible"
            shape={<EventMarker type="negative" />}
          />
          <ReferenceDot
            x="Sat"
            y={2850}
            r={0}
            isFront
            ifOverflow="visible"
            shape={<EventMarker type="positive" />}
          />
          <Legend
            content={() => (
              <div className="flex flex-wrap mt-5 items-center justify-center gap-x-4 gap-y-3 text-[11px]">
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
                  {SERIES.map((item) => {
                    const disabled = item.key.includes("Prev") && !compare;
                    const isVisible = visible[item.key] && !disabled;
                    return (
                      <button
                        type="button"
                        key={item.key}
                        onClick={() => {
                          if (item.key.includes("Prev") && !compare)
                            setCompare(true);
                          toggleSeries(item.key);
                        }}
                        className={`flex items-center gap-1.5 text-[11px] transition ${isVisible ? "text-[#686865]" : "hidden"}`}
                      >
                        <span
                          className="h-[7px] w-[7px] rounded-full"
                          style={{
                            background: item.color,
                            opacity: isVisible ? 1 : 0.4,
                          }}
                        />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
                <div className="flex flex-wrap  items-center justify-center gap-x-5 gap-y-2  border-l border-gray-300 pl-5 text-[11px] text-[#555550]">
                  <span className="flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center text-[#29965c]">
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 11l4-4 3 2 5-6" />
                        <path d="M10 3h4v4" />
                      </svg>
                    </span>
                    Positive Event Impact
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center text-[#d94d58]">
                      <svg
                        viewBox="0 0 16 16"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M2 5l4 4 3-2 5 6" />
                        <path d="M10 13h4V9" />
                      </svg>
                    </span>
                    Negative Event Impact
                  </span>
                </div>
              </div>
            )}
          />
          <Bar
            hide={!visible.pos}
            dataKey="pos"
            name="POS Revenue (Current)"
            stackId="current"
            fill="#292929"
            radius={[0, 0, 0, 0]}
            barSize={compare ? 26 : 52}
          />
          <Bar
            hide={!visible.eatclub}
            dataKey="eatclub"
            name="Eatclub Revenue (Current)"
            stackId="current"
            fill="#5c58e8"
            radius={[3, 3, 0, 0]}
            barSize={compare ? 26 : 52}
          />
          <Bar
            hide={!visible.labour}
            dataKey="labour"
            name="Labour Costs (Current)"
            stackId="labour-current"
            fill="#f0642b"
            radius={[3, 3, 0, 0]}
            barSize={compare ? 26 : 52}
          />
          {compare && (
            <Bar
              hide={!visible.posPrev}
              dataKey="posPrev"
              name="POS Revenue (Previous)"
              stackId="previous"
              fill="#292929"
              fillOpacity={0.22}
              radius={[0, 0, 0, 0]}
              barSize={26}
            />
          )}
          {compare && (
            <Bar
              hide={!visible.eatclubPrev}
              dataKey="eatclubPrev"
              name="Eatclub Revenue (Previous)"
              stackId="previous"
              fill="#5c58e8"
              fillOpacity={0.22}
              radius={[0, 0, 0, 0]}
              barSize={26}
            />
          )}
          {compare && (
            <Bar
              hide={!visible.labourPrev}
              dataKey="labourPrev"
              name="Labour Costs (Previous)"
              stackId="labour-previous"
              fill="#f0642b"
              fillOpacity={0.22}
              radius={[3, 3, 0, 0]}
              barSize={26}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
