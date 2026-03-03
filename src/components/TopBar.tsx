import { Search, User } from "lucide-react";

const TopBar = () => {
  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Search */}
      <div className="flex items-center gap-2 bg-secondary rounded-lg px-4 py-2 w-80">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search data points..."
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
        />
      </div>

      {/* User */}
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-foreground">Pastor Paul</p>
          <p className="text-[11px] uppercase tracking-wider text-primary font-semibold">Personal Assistant</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
