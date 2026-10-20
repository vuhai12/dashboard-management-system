import { DashboardHeader } from "@/components/common/DashboardHeader";
import WeeklyRevenueTable from "@/components/RevenueManagement/WeeklyRevenueTable";
import DatePicker from "@/components/RevenueManagement/DatePicker";

export const RevenueManagement = ({
  onEdit,
  onAdd,
  revenues,
  selectedDate,
  setSelectedDate,
}) => {
  return (
    <main className="min-w-0 flex-1">
      <DashboardHeader />

      <section className="mx-auto max-w-[1800px] p-4 sm:px-[26px] sm:py-[22px]">
        <div className="mb-[18px]">
          <h1 className="text-[25px] font-bold leading-tight tracking-[-0.7px] text-[#10234f]">
            Revenue Management
          </h1>
          <p className="mt-1 text-sm text-[#64799f]">
            Manage weekly revenue data
          </p>
        </div>

        <div className="rounded-[9px] border border-[#e1e9f8] bg-white p-3.5 shadow-[0_1px_4px_rgba(20,55,110,0.025)] sm:p-4">
          <DatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
          <WeeklyRevenueTable
            revenues={revenues}
            onEdit={onEdit}
            onAdd={onAdd}
          />
        </div>
      </section>
    </main>
  );
};
