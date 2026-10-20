import { LogOut, ChartNoAxesCombined } from "lucide-react";

const menuItems = [
  {
    label: "Revenue",
    icon: <ChartNoAxesCombined size={16} />,
    active: true,
  },
];

export const Sidebar = ({ onLogout }) => {
  return (
    <aside className="hidden w-[212px] shrink-0 flex-col bg-[#111d32] text-white md:flex">
      <div className="flex h-[64px] items-center gap-3 border-b border-white/10 px-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
          <ChartNoAxesCombined size={16} />
        </div>
        <span className="text-[15px] font-semibold">Revenue Admin</span>
      </div>

      <nav className="space-y-2 px-[10px] py-5">
        {menuItems.map((item) => (
          <div
            key={item.label}
            className={`flex h-10 items-center gap-4 rounded-lg px-3 text-[13px] ${
              item.active
                ? "bg-[#2862f5] font-medium text-white shadow-sm"
                : "text-slate-200 hover:bg-white/5"
            }`}
          >
            {item.icon}
            {item.label}
          </div>
        ))}
      </nav>

      <div className="mt-auto flex items-center gap-3 border-t border-white/10 px-4 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6b95ff] text-xs font-semibold">
          AD
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium">Admin</p>
        </div>
        <button
          type="button"
          onClick={onLogout}
          aria-label="Log out"
          className="rounded p-1 hover:bg-white/10"
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
};
