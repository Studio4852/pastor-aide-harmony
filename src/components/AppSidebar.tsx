import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  FileText,
  Heart,
  BookOpen,
  CalendarDays,
  LogOut,
  Sparkles,
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

const AppSidebar = ({ onSignOut }: { onSignOut: () => void }) => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 flex flex-col z-30 bg-sidebar border-r border-border/30">
      {/* Logo */}
      <div className="px-6 py-5 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg gradient-primary flex items-center justify-center shadow-lg gold-glow">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-bold text-primary text-lg leading-tight">PPA</h1>
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Executive Intelligence</span>
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
                  ? "gradient-primary text-primary-foreground shadow-md gold-glow"
                  : "text-muted-foreground hover:text-primary hover:bg-accent/50"
              }`}
            >
              <item.icon className="w-[18px] h-[18px]" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom - Sign Out */}
      <div className="px-3 py-4 border-t border-border/30">
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-destructive/80 hover:text-destructive hover:bg-destructive/10 transition-all"
        >
          <LogOut className="w-[18px] h-[18px]" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;
