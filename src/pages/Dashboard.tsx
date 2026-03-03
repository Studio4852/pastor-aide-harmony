import {
  Calendar,
  AlertTriangle,
  TrendingUp,
  FileText,
  Sparkles,
  Clock,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const now = new Date();
  const greeting =
    now.getHours() < 12 ? "Good morning" : now.getHours() < 17 ? "Good afternoon" : "Good evening";
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Greeting */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {greeting}, <span className="text-primary">Pastor Paul</span>
          </h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> {dateStr}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 text-sm">
          <span className="w-2 h-2 rounded-full bg-success" />
          <span className="text-muted-foreground">System Status</span>
          <span className="font-semibold text-success">All Active</span>
        </div>
      </div>

      {/* AI Command */}
      <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
        <Sparkles className="w-5 h-5 text-primary" />
        <input
          type="text"
          placeholder="Type an AI command or request high-level summary..."
          className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none flex-1"
        />
        <button className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground hover:opacity-90 transition">
          <TrendingUp className="w-4 h-4" />
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <SummaryCard
          icon={<Calendar className="w-5 h-5 text-primary" />}
          label="NEXT MEETING"
          title="Leadership Meeting"
          subtitle="Starts in 2 hours"
          metricLabel="PREP STATUS"
          metricValue={80}
          metricColor="bg-primary"
        />
        <SummaryCard
          icon={<AlertTriangle className="w-5 h-5 text-destructive" />}
          label="CRITICAL TASKS"
          title="3 Priority Items"
          subtitle="Attention required today"
          metricLabel="TASK COMPLETION"
          metricValue={65}
          metricColor="bg-destructive"
        />
        <SummaryCard
          icon={<TrendingUp className="w-5 h-5 text-success" />}
          label="MINISTRY IMPACT"
          title="94.2% Optimal"
          subtitle="+3.1% from last week"
          metricLabel="ENGAGEMENT SCORE"
          metricValue={94}
          metricColor="bg-success"
        />
      </div>

      {/* Intelligence Feed + Sidebar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              Intelligence Feed <span className="w-2 h-2 rounded-full bg-success" />
            </h2>
            <button className="text-sm font-semibold text-primary hover:underline">View History</button>
          </div>

          <FeedItem
            icon={<FileText className="w-5 h-5 text-primary" />}
            title="Sermon Prep Reminder"
            description="Sunday's sermon on 'Grace in Action' — Scripture references and outline ready for review."
            time="08:30 AM"
            actions={["Review", "Dismiss"]}
          />
          <FeedItem
            icon={<TrendingUp className="w-5 h-5 text-success" />}
            title="Weekly Engagement Report"
            description="Last week's sermon reached 2.4K views. Comment sentiment: 92% positive. Top theme: forgiveness."
            time="06:12 AM"
            badge="94% CONFIDENCE"
          />
          <FeedItem
            icon={<Calendar className="w-5 h-5 text-primary" />}
            title="Schedule Optimization"
            description="Detected 3 back-to-back meetings tomorrow. Recommending buffer time for preparation."
            time="Yesterday"
          />
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Ministry Health
            </h3>
            <MetricRow label="Team Engagement" value={88} color="bg-primary" />
            <MetricRow label="Operational Load" value={42} color="bg-info" />
          </div>

          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Response Time
            </h3>
            <p className="text-3xl font-bold text-foreground">0.4s</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Upcoming Events
            </h3>
            <div className="space-y-2 text-sm">
              <p className="text-foreground font-medium">Sunday Service</p>
              <p className="text-muted-foreground">Mar 9 · 9:00 AM</p>
              <p className="text-foreground font-medium">Youth Conference</p>
              <p className="text-muted-foreground">Mar 15 · 8:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({
  icon,
  label,
  title,
  subtitle,
  metricLabel,
  metricValue,
  metricColor,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  subtitle: string;
  metricLabel: string;
  metricValue: number;
  metricColor: string;
}) => (
  <div className="bg-card border border-border rounded-xl p-5 space-y-4 animate-fade-in">
    <div className="flex items-start justify-between">
      <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">{icon}</div>
      <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
    <div>
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
      <p className="text-sm text-primary flex items-center gap-1 mt-1">
        <Clock className="w-3 h-3" /> {subtitle}
      </p>
    </div>
    <div>
      <div className="flex justify-between text-[10px] font-semibold uppercase tracking-wider mb-1">
        <span className="text-muted-foreground">{metricLabel}</span>
        <span className="text-foreground">{metricValue}%</span>
      </div>
      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${metricColor}`} style={{ width: `${metricValue}%` }} />
      </div>
    </div>
  </div>
);

const FeedItem = ({
  icon,
  title,
  description,
  time,
  actions,
  badge,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  time: string;
  actions?: string[];
  badge?: string;
}) => (
  <div className="bg-card border border-border rounded-xl p-5 flex gap-4 animate-fade-in">
    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">{icon}</div>
    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between">
        <h4 className="font-semibold text-foreground">{title}</h4>
        <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">{time}</span>
      </div>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
      {actions && (
        <div className="flex gap-2 mt-3">
          {actions.map((a, i) => (
            <button
              key={a}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                i === 0
                  ? "bg-primary text-primary-foreground hover:opacity-90"
                  : "bg-secondary text-foreground hover:bg-muted"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      )}
      {badge && (
        <p className="text-xs font-semibold text-success mt-2 flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> {badge}
        </p>
      )}
    </div>
  </div>
);

const MetricRow = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-muted-foreground font-medium">{label}</span>
      <span className="font-semibold text-foreground">{value}%</span>
    </div>
    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
    </div>
  </div>
);

export default Dashboard;
