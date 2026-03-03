import { BookOpen, TrendingUp, Heart, MessageCircle, Eye, ThumbsUp, Play } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const engagementData = [
  { week: "W1", views: 1200, engagement: 340 },
  { week: "W2", views: 1800, engagement: 520 },
  { week: "W3", views: 2100, engagement: 680 },
  { week: "W4", views: 2400, engagement: 750 },
  { week: "W5", views: 1900, engagement: 600 },
  { week: "W6", views: 2800, engagement: 920 },
  { week: "W7", views: 3200, engagement: 1100 },
];

const recentSermons = [
  { title: "Grace in Action", date: "Feb 23", views: "2.4K", sentiment: 92, topTheme: "Forgiveness" },
  { title: "Walking by Faith", date: "Feb 16", views: "1.9K", sentiment: 88, topTheme: "Trust" },
  { title: "The Power of Prayer", date: "Feb 9", views: "3.1K", sentiment: 95, topTheme: "Healing" },
];

const SermonsPage = () => (
  <div className="max-w-7xl mx-auto space-y-6">
    <div>
      <h1 className="text-3xl font-bold text-foreground">
        Sermon <span className="text-primary">Analytics</span>
      </h1>
      <p className="text-muted-foreground mt-1">Social media integration & audience insights</p>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-4 gap-4">
      {[
        { icon: Eye, label: "Total Views", value: "12.4K", change: "+18%" },
        { icon: ThumbsUp, label: "Avg. Sentiment", value: "91%", change: "+3%" },
        { icon: MessageCircle, label: "Comments", value: "342", change: "+24%" },
        { icon: Play, label: "Avg. Watch Time", value: "18m", change: "+2m" },
      ].map((s) => (
        <div key={s.label} className="bg-card border border-border rounded-xl p-5 animate-fade-in">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <s.icon className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">{s.label}</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{s.value}</p>
          <p className="text-xs text-success font-medium mt-1">{s.change} this month</p>
        </div>
      ))}
    </div>

    {/* Chart */}
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-semibold text-foreground mb-4">Engagement Trends</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={engagementData}>
          <defs>
            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(174, 62%, 40%)" stopOpacity={0.15} />
              <stop offset="95%" stopColor="hsl(174, 62%, 40%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 92%)" />
          <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="hsl(215, 10%, 50%)" />
          <YAxis tick={{ fontSize: 12 }} stroke="hsl(215, 10%, 50%)" />
          <Tooltip />
          <Area type="monotone" dataKey="views" stroke="hsl(174, 62%, 40%)" fill="url(#colorViews)" strokeWidth={2} />
          <Area type="monotone" dataKey="engagement" stroke="hsl(210, 80%, 55%)" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
        </AreaChart>
      </ResponsiveContainer>
    </div>

    {/* Recent sermons */}
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-semibold text-foreground mb-4">Recent Sermons</h3>
      <div className="space-y-3">
        {recentSermons.map((s) => (
          <div key={s.title} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground">{s.date} · {s.views} views</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <p className="font-bold text-foreground">{s.sentiment}%</p>
                <p className="text-[10px] text-muted-foreground uppercase">Sentiment</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-primary">{s.topTheme}</p>
                <p className="text-[10px] text-muted-foreground uppercase">Top Theme</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SermonsPage;
