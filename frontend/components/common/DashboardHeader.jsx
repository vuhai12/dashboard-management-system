export const DashboardHeader = () => {
  return (
    <header className="flex h-[49px] items-center justify-end gap-5 border-b border-slate-200/80 bg-white px-5 sm:px-7">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2862f5] text-xs font-semibold text-white">
          AD
        </div>
        <span className="text-xs font-medium">Admin</span>
      </div>
    </header>
  );
};
