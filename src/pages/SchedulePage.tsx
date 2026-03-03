import { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, Plus, Link, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const hours = Array.from({ length: 14 }, (_, i) => i + 6);

const events = [
  { start: 8, duration: 1, title: "Morning Devotion", color: "bg-primary/10 border-primary text-primary" },
  { start: 10, duration: 1.5, title: "Leadership Meeting", color: "bg-info/10 border-info text-info" },
  { start: 13, duration: 1, title: "Lunch with Elder Board", color: "bg-warning/10 border-warning text-warning-foreground" },
  { start: 15, duration: 2, title: "Sermon Preparation", color: "bg-success/10 border-success text-success" },
];

const SchedulePage = () => {
  const { toast } = useToast();
  const [currentDate] = useState(new Date());

  const today = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Calendar</h1>
          <p className="text-muted-foreground mt-1">Autonomous meeting scheduling & optimization</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => toast({ title: "Calendar Sync", description: "Syncing with Google Calendar..." })} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary transition">
            <Link className="w-4 h-4" />
          </button>
          <button onClick={() => toast({ title: "Settings", description: "Calendar settings panel coming soon." })} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary transition">
            <Settings className="w-4 h-4" />
          </button>
          <button onClick={() => toast({ title: "New Event", description: "Event creation form opening..." })} className="gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 shadow-md transition">
            <Plus className="w-4 h-4" /> Create
          </button>
        </div>
      </div>

      {/* Date nav */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 glass-card rounded-lg px-4 py-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground ml-1">{today}</span>
        </div>
        <button onClick={() => toast({ title: "Previous Day", description: "Navigating to previous day..." })} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button onClick={() => toast({ title: "Next Day", description: "Navigating to next day..." })} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-secondary transition">
          <ChevronRight className="w-4 h-4" />
        </button>
        <button className="gradient-primary text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-sm">
          Today
        </button>
      </div>

      {/* Timeline */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="grid grid-cols-[80px_1fr] text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
          <div className="p-3">Time</div>
          <div className="p-3">Timeline</div>
        </div>
        <div className="relative">
          {hours.map((h) => (
            <div key={h} className="grid grid-cols-[80px_1fr] border-b border-border last:border-0">
              <div className="p-3 text-sm text-muted-foreground">
                {h > 12 ? h - 12 : h} {h >= 12 ? "PM" : "AM"}
              </div>
              <div className="p-3 min-h-[60px] relative">
                {events
                  .filter((e) => e.start === h)
                  .map((e) => (
                    <button
                      key={e.title}
                      onClick={() => toast({ title: e.title, description: `Duration: ${e.duration}h. Click to edit details.` })}
                      className={`absolute left-3 right-3 rounded-lg border-l-4 px-3 py-2 text-sm font-medium text-left cursor-pointer hover:opacity-80 transition ${e.color}`}
                      style={{ height: `${e.duration * 60}px` }}
                    >
                      {e.title}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
