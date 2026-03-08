import { useState, useEffect } from "react";
import { CalendarDays, MapPin, Users, Clock, Plus, Cake, Heart, X, Gift, User, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, differenceInDays, setYear } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type EventType = "Service" | "Conference" | "Program";
type SpecialDateType = "birthday" | "anniversary";

interface SpecialDate {
  id: string;
  name: string;
  date: string; // ISO date string
  type: SpecialDateType;
  note?: string;
}

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

const STORAGE_KEY = "ppa-special-dates";

const defaultSpecialDates: SpecialDate[] = [
  { id: "ex-1", name: "Mom", date: "1965-06-15T00:00:00.000Z", type: "birthday", note: "Loves flowers and chocolate cake" },
  { id: "ex-2", name: "Pastor James", date: "1978-09-22T00:00:00.000Z", type: "birthday", note: "Gift idea: new study Bible" },
  { id: "ex-3", name: "Sister Grace", date: "1990-12-03T00:00:00.000Z", type: "birthday" },
  { id: "ex-4", name: "Wedding Anniversary", date: "2010-04-18T00:00:00.000Z", type: "anniversary", note: "14th year — dinner at our favorite spot" },
  { id: "ex-5", name: "Church Founding Anniversary", date: "2005-01-10T00:00:00.000Z", type: "anniversary", note: "21 years of faithful service" },
];

const loadSpecialDates = (): SpecialDate[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultSpecialDates;
  } catch {
    return defaultSpecialDates;
  }
};

const saveSpecialDates = (dates: SpecialDate[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dates));
};

const getDaysUntil = (dateStr: string): number => {
  const now = new Date();
  const date = new Date(dateStr);
  const thisYear = setYear(date, now.getFullYear());
  let diff = differenceInDays(thisYear, now);
  if (diff < 0) {
    const nextYear = setYear(date, now.getFullYear() + 1);
    diff = differenceInDays(nextYear, now);
  }
  return diff;
};

const EventsPage = () => {
  const { toast } = useToast();
  const [specialDates, setSpecialDates] = useState<SpecialDate[]>(loadSpecialDates);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDate, setNewDate] = useState<Date | undefined>();
  const [newType, setNewType] = useState<SpecialDateType>("birthday");
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    saveSpecialDates(specialDates);
  }, [specialDates]);

  const handleAdd = () => {
    const trimmedName = newName.trim();
    if (!trimmedName || !newDate) {
      toast({ title: "Missing info", description: "Please enter a name and select a date.", variant: "destructive" });
      return;
    }
    if (trimmedName.length > 100) {
      toast({ title: "Name too long", description: "Name must be under 100 characters.", variant: "destructive" });
      return;
    }
    const entry: SpecialDate = {
      id: crypto.randomUUID(),
      name: trimmedName,
      date: newDate.toISOString(),
      type: newType,
      note: newNote.trim().slice(0, 200) || undefined,
    };
    setSpecialDates((prev) => [...prev, entry]);
    setNewName("");
    setNewDate(undefined);
    setNewNote("");
    setDialogOpen(false);
    toast({ title: `${newType === "birthday" ? "Birthday" : "Anniversary"} added`, description: `${trimmedName} on ${format(newDate, "MMM d")}` });
  };

  const handleDelete = (id: string) => {
    setSpecialDates((prev) => prev.filter((d) => d.id !== id));
    toast({ title: "Removed", description: "Special date has been removed." });
  };

  const sortedSpecialDates = [...specialDates].sort((a, b) => getDaysUntil(a.date) - getDaysUntil(b.date));

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Events</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage church events & special dates</p>
        </div>
        <button onClick={() => toast({ title: "Create Event", description: "Event creation form opening..." })} className="gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 shadow-md transition self-start">
          <Plus className="w-4 h-4" /> Create Event
        </button>
      </div>

      <Tabs defaultValue="events" className="w-full">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="events" className="text-sm">Church Events</TabsTrigger>
          <TabsTrigger value="special" className="text-sm">Birthdays & Anniversaries</TabsTrigger>
        </TabsList>

        <TabsContent value="events" className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div key={event.title} className="glass-card rounded-xl overflow-hidden animate-fade-in">
                <div className="p-4 md:p-5 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-foreground truncate">{event.title}</h3>
                      <p className="text-xs text-muted-foreground">{event.ministry}</p>
                    </div>
                    <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border shrink-0 ${eventColors[event.type]}`}>
                      {event.type}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.desc}</p>
                  <div className="space-y-1.5 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 shrink-0" /> {event.date}</p>
                    <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 shrink-0" /> {event.location}</p>
                    <p className="flex items-center gap-2"><Users className="w-3.5 h-3.5 shrink-0" /> {event.registered} registered</p>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full rounded-full gradient-primary" style={{ width: `${event.progress}%` }} />
                  </div>
                </div>
                <div className="border-t border-border px-4 md:px-5 py-3 flex items-center justify-between">
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
        </TabsContent>

        <TabsContent value="special" className="mt-4 space-y-4">
          {/* Add Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setDialogOpen(true)}
              className="gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 shadow-md transition"
            >
              <Plus className="w-4 h-4" /> Add Birthday / Anniversary
            </button>
          </div>

          {/* Upcoming Section */}
          {sortedSpecialDates.length === 0 ? (
            <div className="glass-card rounded-xl p-8 text-center">
              <Gift className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
              <h3 className="font-semibold text-foreground">No special dates yet</h3>
              <p className="text-sm text-muted-foreground mt-1">Add birthdays and anniversaries of important people in your life.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedSpecialDates.map((item) => {
                const daysUntil = getDaysUntil(item.date);
                const dateObj = new Date(item.date);
                const isBirthday = item.type === "birthday";
                const isToday = daysUntil === 0;
                const isSoon = daysUntil <= 7;

                return (
                  <div
                    key={item.id}
                    className={cn(
                      "glass-card rounded-xl p-4 md:p-5 animate-fade-in relative group",
                      isToday && "ring-2 ring-primary/50"
                    )}
                  >
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-destructive/10 text-destructive flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center shrink-0",
                        isBirthday ? "bg-primary/10" : "bg-destructive/10"
                      )}>
                        {isBirthday ? <Cake className="w-5 h-5 text-primary" /> : <Heart className="w-5 h-5 text-destructive" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-foreground truncate">{item.name}</h3>
                        <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1.5">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                        {format(dateObj, "MMMM d")}
                      </p>
                      {item.note && (
                        <p className="text-xs text-muted-foreground italic">"{item.note}"</p>
                      )}
                    </div>
                    <div className="mt-3">
                      {isToday ? (
                        <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                          🎉 Today!
                        </span>
                      ) : isSoon ? (
                        <span className="text-xs font-semibold text-warning bg-warning/10 px-2.5 py-1 rounded-full">
                          In {daysUntil} day{daysUntil !== 1 ? "s" : ""}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          In {daysUntil} days
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Add Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Special Date</DialogTitle>
            <DialogDescription>Add a birthday or anniversary for someone important.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-2">
            {/* Type Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setNewType("birthday")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition border",
                  newType === "birthday"
                    ? "gradient-primary text-white border-transparent shadow-md"
                    : "bg-secondary text-muted-foreground border-border hover:bg-muted"
                )}
              >
                <Cake className="w-4 h-4" /> Birthday
              </button>
              <button
                onClick={() => setNewType("anniversary")}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition border",
                  newType === "anniversary"
                    ? "gradient-primary text-white border-transparent shadow-md"
                    : "bg-secondary text-muted-foreground border-border hover:bg-muted"
                )}
              >
                <Heart className="w-4 h-4" /> Anniversary
              </button>
            </div>

            {/* Name */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Name</label>
              <Input
                placeholder={newType === "birthday" ? "e.g. Mom, Pastor John" : "e.g. Wedding Anniversary"}
                value={newName}
                onChange={(e) => setNewName(e.target.value.slice(0, 100))}
                maxLength={100}
              />
            </div>

            {/* Date */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarDays className="w-4 h-4 mr-2" />
                    {newDate ? format(newDate, "MMMM d, yyyy") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={newDate}
                    onSelect={setNewDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Note */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Note (optional)</label>
              <Input
                placeholder="e.g. Gift idea, favorite restaurant"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value.slice(0, 200))}
                maxLength={200}
              />
            </div>

            {/* Submit */}
            <Button onClick={handleAdd} className="w-full gradient-primary text-white hover:opacity-90">
              Add {newType === "birthday" ? "Birthday" : "Anniversary"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventsPage;
