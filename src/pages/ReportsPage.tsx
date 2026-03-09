import { useState } from "react";
import { FileText, TrendingUp, AlertTriangle, CheckCircle2, Download, Eye, BarChart3, PieChart } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPie, Pie, Cell } from "recharts";
import { useToast } from "@/hooks/use-toast";

const weeklyData = [
  { week: "Week 1", attendance: 420, online: 1200, giving: 8500 },
  { week: "Week 2", attendance: 465, online: 1800, giving: 9200 },
  { week: "Week 3", attendance: 510, online: 2100, giving: 11000 },
  { week: "Week 4", attendance: 490, online: 2400, giving: 10500 },
];

const ministryBreakdown = [
  { name: "Worship", value: 35, color: "hsl(250, 75%, 60%)" },
  { name: "Youth", value: 25, color: "hsl(217, 91%, 60%)" },
  { name: "Outreach", value: 20, color: "hsl(152, 69%, 40%)" },
  { name: "Children", value: 12, color: "hsl(38, 92%, 50%)" },
  { name: "Pastoral Care", value: 8, color: "hsl(0, 84%, 60%)" },
];

const sentimentData = [
  { day: "Mon", positive: 85, neutral: 10, negative: 5 },
  { day: "Tue", positive: 90, neutral: 7, negative: 3 },
  { day: "Wed", positive: 78, neutral: 15, negative: 7 },
  { day: "Thu", positive: 92, neutral: 5, negative: 3 },
  { day: "Fri", positive: 88, neutral: 8, negative: 4 },
  { day: "Sat", positive: 80, neutral: 12, negative: 8 },
  { day: "Sun", positive: 95, neutral: 3, negative: 2 },
];

const generatedReports = [
  { title: "Weekly Ministry Report — Feb 24", date: "Feb 24, 2026", status: "Published", views: 42 },
  { title: "Monthly Impact Summary — Feb", date: "Feb 28, 2026", status: "Published", views: 128 },
  { title: "Youth Conference Post-Mortem", date: "Mar 1, 2026", status: "Draft", views: 8 },
];

const actionItems = [
  { task: "Follow up with Elder Board on Q1 budget", due: "Mar 5", status: "overdue", assignee: "PPA" },
  { task: "Review youth conference feedback", due: "Mar 7", status: "pending", assignee: "Youth Ministry Lead" },
  { task: "Submit annual health insurance forms", due: "Mar 10", status: "pending", assignee: "PPA" },
  { task: "Approve sermon series schedule for April", due: "Mar 12", status: "pending", assignee: "PPA" },
];

const alerts = [
  { type: "warning", message: "Online engagement dropped 12% vs last week", time: "2 hours ago" },
  { type: "info", message: "New volunteer applications: 5 pending review", time: "5 hours ago" },
  { type: "success", message: "Sunday giving target exceeded by 15%", time: "Yesterday" },
];

const ReportsPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handleGenerateReport = () => {
    toast({ title: "Report Generated", description: "Weekly Ministry Report for Mar 3 has been created as a draft." });
  };

  const handleDetectAlerts = () => {
    toast({ title: "Alert Scan Complete", description: "Found 3 active alerts across integrations." });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">Weekly broadcast highlights & ministry reporting</p>
        </div>
        <button
          onClick={handleGenerateReport}
          className="gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 shadow-md transition"
        >
          <FileText className="w-4 h-4" /> Generate Report
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-border pb-0">
        {["overview", "reports", "alerts"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-medium border-b-2 transition capitalize ${
              activeTab === tab ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Avg Attendance", value: "471", change: "+8%", icon: TrendingUp, color: "text-primary" },
              { label: "Online Reach", value: "7.5K", change: "+22%", icon: Eye, color: "text-info" },
              { label: "Monthly Giving", value: "$39.2K", change: "+12%", icon: BarChart3, color: "text-success" },
              { label: "Volunteer Hours", value: "186", change: "+5%", icon: CheckCircle2, color: "text-warning" },
            ].map((m) => (
              <div key={m.label} className="glass-card rounded-xl p-5 animate-fade-in">
                <div className="flex items-center gap-2 mb-2">
                  <m.icon className={`w-4 h-4 ${m.color}`} />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{m.label}</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{m.value}</p>
                <p className="text-xs text-success font-medium mt-1">{m.change} this month</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card rounded-xl p-5">
              <h3 className="font-semibold text-foreground mb-4">Weekly Trends</h3>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(250, 75%, 60%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(250, 75%, 60%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorOnline" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                  <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
                  <Tooltip />
                  <Area type="monotone" dataKey="attendance" stroke="hsl(250, 75%, 60%)" fill="url(#colorAttendance)" strokeWidth={2} />
                  <Area type="monotone" dataKey="online" stroke="hsl(217, 91%, 60%)" fill="url(#colorOnline)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="glass-card rounded-xl p-5">
              <h3 className="font-semibold text-foreground mb-4">Ministry Breakdown</h3>
              <ResponsiveContainer width="100%" height={220}>
                <RechartsPie>
                  <Pie data={ministryBreakdown} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                    {ministryBreakdown.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPie>
              </ResponsiveContainer>
              <div className="flex flex-wrap gap-3 justify-center mt-2">
                {ministryBreakdown.map((m) => (
                  <span key={m.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <span className="w-2 h-2 rounded-full" style={{ background: m.color }} />
                    {m.name} {m.value}%
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sentiment */}
          <div className="glass-card rounded-xl p-5">
            <h3 className="font-semibold text-foreground mb-4">Audience Sentiment — This Week</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={sentimentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
                <Tooltip />
                <Bar dataKey="positive" stackId="a" fill="hsl(152, 69%, 40%)" radius={[0, 0, 0, 0]} />
                <Bar dataKey="neutral" stackId="a" fill="hsl(220, 13%, 91%)" />
                <Bar dataKey="negative" stackId="a" fill="hsl(0, 84%, 60%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Action Items */}
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-success" /> Action Items
              </h3>
              <span className="text-xs bg-destructive/10 text-destructive px-3 py-0.5 rounded-full font-medium">1 overdue</span>
            </div>
            <div className="space-y-2">
              {actionItems.map((item) => (
                <div key={item.task} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toast({ title: "Task Completed", description: `"${item.task}" marked as done.` })}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition hover:bg-primary hover:border-primary hover:text-white ${
                        item.status === "overdue" ? "border-destructive" : "border-border"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.task}</p>
                      <p className="text-xs text-muted-foreground">{item.assignee} · Due {item.due}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    item.status === "overdue" ? "bg-destructive/10 text-destructive" : "bg-secondary text-muted-foreground"
                  }`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === "reports" && (
        <div className="glass-card rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-bold text-foreground">Generated Reports</h2>
          <div className="space-y-3">
            {generatedReports.map((r) => (
              <div key={r.title} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                    <FileText className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{r.title}</p>
                    <p className="text-xs text-muted-foreground">{r.date} · {r.views} views</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    r.status === "Published" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                  }`}>{r.status}</span>
                  <button
                    onClick={() => toast({ title: "Download", description: `Downloading "${r.title}"...` })}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:bg-secondary transition"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <FileText className="w-4 h-4" /> {generatedReports.length} archived reports
          </p>
        </div>
      )}

      {activeTab === "alerts" && (
        <div className="space-y-4">
          <div className="glass-card rounded-xl p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold text-foreground">Monitor Business Data</h2>
                <p className="text-sm text-muted-foreground mt-1">Track KPIs, anomalies, and system alerts.</p>
              </div>
              <button
                onClick={handleDetectAlerts}
                className="border border-border px-4 py-2 rounded-lg text-sm font-medium text-foreground flex items-center gap-2 hover:bg-secondary transition"
              >
                <AlertTriangle className="w-4 h-4" /> Detect Alerts
              </button>
            </div>

            <div className="space-y-3">
              {alerts.map((alert, i) => (
                <div key={i} className={`flex items-start gap-3 p-4 rounded-lg ${
                  alert.type === "warning" ? "bg-warning/10 border border-warning/20" :
                  alert.type === "success" ? "bg-success/10 border border-success/20" :
                  "bg-info/10 border border-info/20"
                }`}>
                  <AlertTriangle className={`w-4 h-4 mt-0.5 ${
                    alert.type === "warning" ? "text-warning" :
                    alert.type === "success" ? "text-success" :
                    "text-info"
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{alert.time}</p>
                  </div>
                  <button
                    onClick={() => toast({ title: "Alert Acknowledged", description: alert.message })}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Acknowledge
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Alert Trends */}
          <div className="glass-card rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <div>
                  <h3 className="font-semibold text-foreground">Alert Trends</h3>
                  <p className="text-xs text-muted-foreground">Rolling view across latest window.</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground bg-secondary rounded-full px-3 py-1">
                Feb 1 – Mar 3, 2026
              </span>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {[
                { label: "Total Alerts", value: "12" },
                { label: "Resolved", value: "9" },
                { label: "Acknowledged", value: "2" },
                { label: "Resolution Rate", value: "75%" },
              ].map((m) => (
                <div key={m.label} className="bg-secondary/50 rounded-lg p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{m.label}</p>
                  <p className="text-xl font-bold text-foreground mt-1">{m.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportsPage;
