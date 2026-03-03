import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  FileText,
  Heart,
  Settings,
  BookOpen,
  CalendarDays,
} from "lucide-react";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/schedule", icon: Calendar, label: "Scheduling" },
  { to: "/communication", icon: MessageSquare, label: "Communication" },
  { to: "/sermons", icon: BookOpen, label: "Sermons" },
  { to: "/events", icon: CalendarDays, label: "Events" },
  { to: "/reports", icon: FileText, label: "Reports" },
  { to: "/health", icon: Heart, label: "Health" },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 flex flex-col z-30" style={{ background: 'hsl(240, 20%, 14%)' }}>
      {/* Logo */}
      <div className="px-6 py-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-lg">P</span>
        </div>
        <div>
          <h1 className="font-bold text-white text-lg leading-tight">PPA</h1>
          <span className="text-[10px] uppercase tracking-widest text-white/50">Pastor Paul</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "gradient-primary text-white shadow-md"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <item.icon className="w-[18px] h-[18px]" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-white/10">
        <NavLink
          to="/settings"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all"
        >
          <Settings className="w-[18px] h-[18px]" />
          Settings
        </NavLink>
      </div>
    </aside>
  );
};

export default AppSidebar;
