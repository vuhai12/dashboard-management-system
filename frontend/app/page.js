"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toPng } from "html-to-image";

import { getRevenueDashboard } from "@/services/revenueService";
import { toISODate } from "@/utils/dateUtils";
import { EventMarker } from "@/components/RevenueManagement/EventMarker";
import { RevenueSummary } from "@/components/WeeklyRevenueChart/RevenueSummary";
import { WeeklyRevenueBarChart } from "@/components/WeeklyRevenueChart/WeeklyRevenueBarChart";
import { RevenueChartControls } from "@/components/WeeklyRevenueChart/RevenueChartControls";

export default function RevenueChart() {
  const [compare, setCompare] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [visible, setVisible] = useState({
    pos: true,
    eatclub: true,
    labour: true,
    posPrev: true,
    eatclubPrev: true,
    labourPrev: true,
  });
  const [selectedDate, setSelectedDate] = useState(() => toISODate(new Date()));
  const [selectedRevenueDataDashboard, setSelectedRevenueDataDashboard] =
    useState([]);
  const [summary, setSummary] = useState(null);
  const chartRef = useRef(null);

  const fetchRevenuesDashboard = useCallback(async () => {
    try {
      const result = await getRevenueDashboard(selectedDate);
      setSummary(result.summary);
      setSelectedRevenueDataDashboard(result.data);
    } catch (error) {
      console.error("Failed to fetch revenues:", error);
    }
  }, [selectedDate]);

  useEffect(() => {
    fetchRevenuesDashboard();
  }, [fetchRevenuesDashboard]);

  const toggleSeries = (key) => {
    setVisible((current) => ({ ...current, [key]: !current[key] }));
  };

  const exportPng = async () => {
    if (!chartRef.current || exporting) return;
    try {
      setExporting(true);
      const dataUrl = await toPng(chartRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
      });
      const link = document.createElement("a");
      link.download = "revenue-trend.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Could not export chart as PNG:", error);
      window.alert("Could not export chart as PNG. Please try again.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <section
      ref={chartRef}
      className="rounded-2xl border border-[#e9e9e6] bg-white p-4 shadow-[0_2px_12px_rgba(20,20,20,0.025)] sm:p-6"
    >
      <RevenueChartControls
        toggleSeries={toggleSeries}
        setCompare={setCompare}
        compare={compare}
        exportPng={exportPng}
        exporting={exporting}
        visible={visible}
      />
      <RevenueSummary summary={summary} compare={compare} />
      <WeeklyRevenueBarChart
        compare={compare}
        visible={visible}
        toggleSeries={toggleSeries}
        setCompare={setCompare}
        selectedRevenueDataDashboard={selectedRevenueDataDashboard}
      />
      <EventMarker
        cx={100}
        cy={80}
        type={
          summary?.totalRevenue.direction === "increase"
            ? "positive"
            : "negative"
        }
      />
    </section>
  );
}
