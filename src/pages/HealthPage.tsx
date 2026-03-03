import { Heart, Activity, Moon, Footprints, Droplets, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";

const weeklySteps = [
  { day: "Mon", steps: 6200 },
  { day: "Tue", steps: 8400 },
  { day: "Wed", steps: 4100 },
  { day: "Thu", steps: 9200 },
  { day: "Fri", steps: 3500 },
  { day: "Sat", steps: 7800 },
  { day: "Sun", steps: 5600 },
];

const HealthPage = () => {
  const { toast } = useToast();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Health & <span className="text-primary">Wellbeing</span>
        </h1>
        <p className="text-muted-foreground mt-1">Personal health tracking and recovery insights</p>
      </div>

      {/* Alert */}
      <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-warning mt-0.5" />
        <div className="flex-1">
          <p className="font-semibold text-foreground text-sm">Travel Fatigue Alert</p>
          <p className="text-sm text-muted-foreground">After 3 intense travel days, we recommend lighter scheduling and recovery time today.</p>
        </div>
        <button onClick={() => toast({ title: "Alert Dismissed", description: "Travel fatigue alert has been acknowledged." })} className="text-xs font-medium text-primary hover:underline">Dismiss</button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: Heart, label: "Resting HR", value: "68 bpm", sub: "Normal range", color: "text-destructive" },
          { icon: Footprints, label: "Daily Steps", value: "5,600", sub: "Goal: 10,000", color: "text-primary" },
          { icon: Moon, label: "Sleep", value: "6.5 hrs", sub: "Below target", color: "text-info" },
          { icon: Droplets, label: "Hydration", value: "1.8L", sub: "Goal: 3L", color: "text-primary" },
        ].map((m) => (
          <div key={m.label} className="glass-card rounded-xl p-5 animate-fade-in">
            <div className="flex items-center gap-2 mb-2">
              <m.icon className={`w-4 h-4 ${m.color}`} />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{m.label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{m.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-1">Activity Overview</h3>
          <p className="text-sm text-muted-foreground mb-4">Weekly step count performance</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklySteps}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
              <Tooltip />
              <Bar dataKey="steps" fill="hsl(250, 75%, 60%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-1">Daily Goals</h3>
          <p className="text-sm text-muted-foreground mb-4">Progress towards your targets</p>
          <div className="space-y-4">
            {[
              { label: "Steps", current: 5600, goal: 10000, color: "gradient-primary" },
              { label: "Water", current: 1.8, goal: 3, unit: "L", color: "gradient-cool" },
              { label: "Sleep", current: 6.5, goal: 8, unit: "hrs", color: "gradient-warm" },
              { label: "Exercise", current: 20, goal: 30, unit: "min", color: "gradient-primary" },
            ].map((g) => (
              <div key={g.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{g.label}</span>
                  <span className="text-foreground font-medium">
                    {g.current}{g.unit || ""} / {g.goal}{g.unit || ""}
                  </span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${g.color}`}
                    style={{ width: `${Math.min((g.current / g.goal) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Appointments */}
      <div className="glass-card rounded-xl p-5">
        <h3 className="font-semibold text-foreground mb-4">Upcoming Appointments</h3>
        <div className="space-y-3">
          {[
            { title: "Annual Physical Checkup", date: "Mar 12, 2026 · 10:00 AM", location: "City Medical Center" },
            { title: "Dental Cleaning", date: "Mar 25, 2026 · 2:00 PM", location: "Smile Dental Clinic" },
          ].map((a) => (
            <div key={a.title} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.date} · {a.location}</p>
                </div>
              </div>
              <button onClick={() => toast({ title: a.title, description: `${a.date} at ${a.location}. Added reminder.` })} className="text-sm text-primary font-medium hover:underline">View</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthPage;
