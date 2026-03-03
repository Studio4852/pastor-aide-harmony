import { FileText, TrendingUp, AlertTriangle, CheckCircle2, Plus } from "lucide-react";

const ReportsPage = () => (
  <div className="max-w-7xl mx-auto space-y-6">
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground mt-1">Weekly broadcast highlights & ministry reporting</p>
      </div>
      <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90">
        <FileText className="w-4 h-4" /> Generate Report
      </button>
    </div>

    {/* Generate & Publish */}
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div>
        <h2 className="text-xl font-bold text-foreground">Generate & Publish</h2>
        <p className="text-sm text-muted-foreground mt-1">Kick off report instances and distribute results.</p>
      </div>
      <p className="text-muted-foreground text-sm">No reports generated yet.</p>
      <p className="text-sm text-muted-foreground flex items-center gap-2">
        <FileText className="w-4 h-4" /> 0 archived reports
      </p>
    </div>

    {/* Monitor */}
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Monitor Business Data</h2>
          <p className="text-sm text-muted-foreground mt-1">Track KPIs, anomalies, and system alerts across integrations.</p>
        </div>
        <button className="border border-border px-4 py-2 rounded-lg text-sm font-medium text-foreground flex items-center gap-2 hover:bg-secondary">
          <AlertTriangle className="w-4 h-4" /> Detect Alerts
        </button>
      </div>
      <p className="text-sm text-muted-foreground">No active alerts.</p>

      {/* Alert Trends */}
      <div className="bg-secondary/30 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-warning" />
            <div>
              <h3 className="font-semibold text-foreground">Alert Trends</h3>
              <p className="text-xs text-muted-foreground">Rolling view of system alerts across the latest window.</p>
            </div>
          </div>
          <span className="text-xs text-muted-foreground bg-card border border-border rounded-full px-3 py-1">
            Feb 1, 2026 – Mar 3, 2026
          </span>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Total Alerts", value: "0" },
            { label: "Resolved", value: "0" },
            { label: "Acknowledged", value: "0" },
            { label: "Resolution Rate", value: "N/A" },
          ].map((m) => (
            <div key={m.label} className="bg-card border border-border rounded-lg p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{m.label}</p>
              <p className="text-xl font-bold text-foreground mt-1">{m.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Metrics */}
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Metrics Overview</h3>
          </div>
          <span className="text-xs bg-secondary px-3 py-0.5 rounded-full text-muted-foreground">0 metrics</span>
        </div>
        <p className="text-sm text-muted-foreground">Snapshot of core KPI signals and trends.</p>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <h3 className="font-semibold text-foreground">Action Items Overview</h3>
          </div>
          <span className="text-xs bg-secondary px-3 py-0.5 rounded-full text-muted-foreground">0 overdue</span>
        </div>
        <p className="text-sm text-muted-foreground">You have 0 open action items. 0 are overdue.</p>
      </div>
    </div>
  </div>
);

export default ReportsPage;
