"use client";

import { getWeekRange } from "@/utils/dateUtils";
import { CalendarDays } from "lucide-react";

export default function DatePicker({ selectedDate, setSelectedDate }) {
  const weekRange = getWeekRange(selectedDate);

  return (
    <div className="mb-[18px] flex flex-wrap items-center gap-3">
      <label className="flex h-[43px] w-full max-w-[308px] items-center gap-3 rounded-md border border-[#d5e1f8] bg-white px-3 text-sm shadow-[0_1px_2px_rgba(20,55,110,0.03)] focus-within:border-blue-400">
        <span className="text-blue-600">
          <CalendarDays size={16} />
        </span>

        <input
          aria-label="Choose any date to view its week"
          type="date"
          value={selectedDate}
          onChange={(event) => setSelectedDate(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-[13px] font-medium text-[#1b315e] outline-none"
        />
      </label>

      {weekRange && (
        <div className="flex h-[43px] items-center gap-2 px-3">
          <span className="text-[13px] font-semibold text-[#1b315e]">
            {weekRange}
          </span>
        </div>
      )}
    </div>
  );
}
