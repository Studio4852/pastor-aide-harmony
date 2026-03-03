import { CalendarDays, MapPin, Users, Clock, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type EventType = "Service" | "Conference" | "Program";

const eventColors: Record<EventType, string> = {
  Service: "bg-primary/10 text-primary border-primary",
  Conference: "bg-destructive/10 text-destructive border-destructive",
  Program: "bg-warning/10 text-warning-foreground border-warning",
};

const events = [
  { title: "Sunday Worship Service", ministry: "Worship", desc: "Weekly Sunday worship service", date: "Mar 9, 2026 · 9:00 AM", location: "Main Auditorium", registered: "350/500", type: "Service" as EventType, progress: 70 },
  { title: "Youth Conference 2026", ministry: "Youth Ministry", desc: "Annual youth empowerment conference", date: "Mar 15, 2026 · 8:00 AM", location: "Conference Hall", registered: "180/200", type: "Conference" as EventType, progress: 90 },
  { title: "Marriage Enrichment Seminar", ministry: "Outreach", desc: "Weekend seminar for married couples", date: "Mar 22, 2026 · 10:00 AM", location: "Fellowship Hall", registered: "42/80", type: "Program" as EventType, progress: 52 },
  { title: "Children's Easter Program", ministry: "Children's Ministry", desc: "Special Easter program for children", date: "Apr 5, 2026 · 10:00 AM", location: "Children's Wing", registered: "65/100", type: "Program" as EventType, progress: 65 },
  { title: "Night of Prayer", ministry: "Prayer Team", desc: "Monthly prayer vigil", date: "Mar 7, 2026 · 9:00 PM", location: "Main Auditorium", registered: "120/300", type: "Service" as EventType, progress: 40 },
  { title: "Tech Workshop", ministry: "Media & Tech", desc: "Media and technology training", date: "Mar 10, 2026 · 2:00 PM", location: "Media Suite", registered: "22/30", type: "Program" as EventType, progress: 73 },
];

const EventsPage = () => {
  const { toast } = useToast();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground mt-1">Manage church events · {events.length} total</p>
        </div>
        <button onClick={() => toast({ title: "Create Event", description: "Event creation form opening..." })} className="gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 shadow-md transition">
          <Plus className="w-4 h-4" /> Create Event
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {events.map((event) => (
          <div key={event.title} className="glass-card rounded-xl overflow-hidden animate-fade-in">
            <div className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-foreground">{event.title}</h3>
                  <p className="text-xs text-muted-foreground">{event.ministry}</p>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${eventColors[event.type]}`}>
                  {event.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{event.desc}</p>
              <div className="space-y-1.5 text-sm text-muted-foreground">
                <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5" /> {event.date}</p>
                <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {event.location}</p>
                <p className="flex items-center gap-2"><Users className="w-3.5 h-3.5" /> {event.registered} registered</p>
              </div>
              <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full rounded-full gradient-primary" style={{ width: `${event.progress}%` }} />
              </div>
            </div>
            <div className="border-t border-border px-5 py-3 flex items-center justify-between">
              <button onClick={() => toast({ title: "Registration Closed", description: `Registration for "${event.title}" has been closed.` })} className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition">
                Close Reg.
              </button>
              <button onClick={() => toast({ title: event.title, description: `Viewing details for "${event.title}".` })} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary transition">
                <CalendarDays className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
