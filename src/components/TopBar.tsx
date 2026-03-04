import { Search, User, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TopBar = () => {
  const { toast } = useToast();

  return (
    <header className="h-16 border-b border-border/50 bg-card/60 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Search */}
      <div className="flex items-center gap-2 bg-muted/50 border border-border/50 rounded-full px-4 py-2 w-80">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search data points..."
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
        />
      </div>

      {/* User */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => toast({ title: "Notifications", description: "You have no new notifications." })}
          className="relative w-9 h-9 rounded-full bg-muted/50 border border-border/50 flex items-center justify-center hover:bg-accent/50 transition"
        >
          <Bell className="w-4 h-4 text-muted-foreground" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center font-bold">3</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">Pastor Paul</p>
            <p className="text-[11px] uppercase tracking-wider text-primary font-semibold">AI-Powered Executive Intelligence</p>
          </div>
          <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center shadow-md gold-glow">
            <User className="w-4 h-4 text-primary-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
