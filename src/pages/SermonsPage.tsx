import { BookOpen, TrendingUp, MessageCircle, Eye, ThumbsUp, Play, Hash, Quote, User } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";

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

const themesUsed = [
  { theme: "Forgiveness", count: 12, trend: "+3", color: "bg-primary/20 text-primary" },
  { theme: "Faith & Trust", count: 9, trend: "+1", color: "bg-info/20 text-info" },
  { theme: "Healing", count: 8, trend: "+2", color: "bg-success/20 text-success" },
  { theme: "Grace", count: 7, trend: "0", color: "bg-accent text-accent-foreground" },
  { theme: "Love & Community", count: 6, trend: "+1", color: "bg-warning/20 text-warning" },
  { theme: "Prayer", count: 5, trend: "+2", color: "bg-primary/20 text-primary" },
];

const topComments = [
  {
    author: "Sarah M.",
    sermon: "Grace in Action",
    comment: "This message truly touched my heart. The illustration about forgiving ourselves was exactly what I needed to hear.",
    likes: 48,
    time: "2 days ago",
  },
  {
    author: "James K.",
    sermon: "The Power of Prayer",
    comment: "Pastor, your testimony about answered prayers gave me so much hope. Sharing this with my small group!",
    likes: 35,
    time: "1 week ago",
  },
  {
    author: "Maria L.",
    sermon: "Walking by Faith",
    comment: "The way you broke down Hebrews 11 was incredible. My kids even understood it. Thank you for making scripture accessible.",
    likes: 29,
    time: "2 weeks ago",
  },
  {
    author: "David R.",
    sermon: "Grace in Action",
    comment: "I've been struggling with guilt for years. This sermon was a turning point for me. God bless you, Pastor.",
    likes: 52,
    time: "3 days ago",
  },
];

const SermonsPage = () => {
  const { toast } = useToast();

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">
          Sermon <span className="text-primary">Analytics</span>
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">Social media integration & audience insights</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { icon: Eye, label: "Total Views", value: "12.4K", change: "+18%" },
          { icon: ThumbsUp, label: "Avg. Sentiment", value: "91%", change: "+3%" },
          { icon: MessageCircle, label: "Comments", value: "342", change: "+24%" },
          { icon: Play, label: "Avg. Watch Time", value: "18m", change: "+2m" },
        ].map((s) => (
          <div key={s.label} className="glass-card rounded-xl p-4 md:p-5 animate-fade-in">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <s.icon className="w-4 h-4" />
              <span className="text-xs font-semibold uppercase tracking-wider">{s.label}</span>
            </div>
            <p className="text-xl md:text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-success font-medium mt-1">{s.change} this month</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="glass-card rounded-xl p-4 md:p-5">
        <h3 className="font-semibold text-foreground mb-4">Engagement Trends</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={engagementData}>
            <defs>
              <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(250, 75%, 60%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(250, 75%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
            <Tooltip />
            <Area type="monotone" dataKey="views" stroke="hsl(250, 75%, 60%)" fill="url(#colorViews)" strokeWidth={2} />
            <Area type="monotone" dataKey="engagement" stroke="hsl(217, 91%, 60%)" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Themes Used & Top Comments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Themes Used */}
        <div className="glass-card rounded-xl p-4 md:p-5">
          <div className="flex items-center gap-2 mb-4">
            <Hash className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">Themes Used in Sermons</h3>
          </div>
          <div className="space-y-3">
            {themesUsed.map((t) => (
              <div
                key={t.theme}
                className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition cursor-pointer"
                onClick={() => toast({ title: t.theme, description: `Used ${t.count} times across sermons` })}
              >
                <div className="flex items-center gap-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${t.color}`}>
                    {t.theme}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">{t.count} sermons</span>
                  <span className={`text-xs font-medium ${t.trend === "0" ? "text-muted-foreground" : "text-success"}`}>
                    {t.trend === "0" ? "—" : t.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Comments */}
        <div className="glass-card rounded-xl p-4 md:p-5">
          <div className="flex items-center gap-2 mb-4">
            <Quote className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">Top Comments</h3>
          </div>
          <div className="space-y-3">
            {topComments.map((c, i) => (
              <div
                key={i}
                className="p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-foreground">{c.author}</p>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">{c.time}</span>
                    </div>
                    <p className="text-[11px] text-primary font-medium">{c.sermon}</p>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{c.comment}</p>
                    <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                      <ThumbsUp className="w-3 h-3" />
                      <span className="text-xs font-medium">{c.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent sermons */}
      <div className="glass-card rounded-xl p-4 md:p-5">
        <h3 className="font-semibold text-foreground mb-4">Recent Sermons</h3>
        <div className="space-y-3">
          {recentSermons.map((s) => (
            <div key={s.title} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition cursor-pointer gap-3" onClick={() => toast({ title: s.title, description: `${s.views} views · ${s.sentiment}% positive sentiment · Top theme: ${s.topTheme}` })}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.date} · {s.views} views</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm ml-13 sm:ml-0">
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
};

export default SermonsPage;
