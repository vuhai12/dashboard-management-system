import { formatCurrency } from "@/utils/formatCurrency";
import { MetricCard } from "./MetricCard";

export const RevenueSummary = ({ summary, compare }) => {
  return (
    <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
      <MetricCard
        label="Total Revenue"
        value={summary ? formatCurrency(summary.totalRevenue.current) : "$0"}
        comparison={
          summary ? formatCurrency(summary.totalRevenue.previous) : "$0"
        }
        percentageChange={summary?.totalRevenue?.percentageChange}
        direction={summary?.totalRevenue?.direction}
        compare={compare}
      />
      <MetricCard
        label="Average per Day"
        value={summary ? formatCurrency(summary.averagePerDay.current) : "$0"}
        comparison={
          summary ? formatCurrency(summary.averagePerDay.previous) : "$0"
        }
        percentageChange={summary?.averagePerDay?.percentageChange}
        direction={summary?.averagePerDay?.direction}
        compare={compare}
      />
      <MetricCard
        label="Total Covers"
        value={summary ? summary.totalCovers.current : "0"}
        comparison={summary ? summary.totalCovers.previous : "0"}
        percentageChange={summary?.totalCovers?.percentageChange}
        direction={summary?.totalCovers?.direction}
        compare={compare}
      />
    </div>
  );
};
