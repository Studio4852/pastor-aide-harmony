import { Mail, MessageSquare, Send, Clock, Filter } from "lucide-react";

const tabs = ["Inbox", "Drafts", "Outbox/Queue", "Important Dates"];
const filters = ["All", "Unread", "High Priority"];

const emails = [
  {
    from: "Elder James",
    subject: "Budget Review Meeting",
    preview: "Pastor, I've attached the Q1 financial summary for your review before Thursday's...",
    time: "9:15 AM",
    unread: true,
    priority: true,
  },
  {
    from: "Youth Ministry",
    subject: "Conference Registration Update",
    preview: "We've reached 85% capacity for the youth conference. Need approval to open waitlist...",
    time: "8:42 AM",
    unread: true,
    priority: false,
  },
  {
    from: "Media Team",
    subject: "Sunday Service Recording",
    preview: "The edited version of last Sunday's sermon is ready for review and upload...",
    time: "Yesterday",
    unread: false,
    priority: false,
  },
  {
    from: "Pastoral Care",
    subject: "Hospital Visit Schedule",
    preview: "Three members are currently hospitalized. Coordinated visit schedule attached...",
    time: "Yesterday",
    unread: false,
    priority: true,
  },
];

const CommunicationPage = () => (
  <div className="max-w-7xl mx-auto space-y-6">
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Communication <span className="text-primary">Intelligence</span>
        </h1>
        <div className="flex items-center gap-3 mt-2">
          <span className="flex items-center gap-1.5 text-sm">
            <span className="w-2 h-2 rounded-full bg-warning" />
            <span className="text-warning font-medium">Sync Status: Connecting</span>
          </span>
          <span className="text-sm text-muted-foreground bg-secondary px-3 py-0.5 rounded-full">Unread: 2</span>
        </div>
      </div>
      <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90">
        <Send className="w-4 h-4" /> Compose
      </button>
    </div>

    {/* Tabs */}
    <div className="flex gap-6 border-b border-border pb-0">
      {tabs.map((tab, i) => (
        <button
          key={tab}
          className={`pb-3 text-sm font-medium border-b-2 transition ${
            i === 0 ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>

    {/* Filters */}
    <div className="flex gap-2">
      {filters.map((f, i) => (
        <button
          key={f}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
            i === 0 ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-secondary"
          }`}
        >
          {f}
        </button>
      ))}
    </div>

    {/* Email list + detail */}
    <div className="grid grid-cols-5 gap-4">
      <div className="col-span-2 space-y-2">
        {emails.map((email) => (
          <div
            key={email.subject}
            className={`bg-card border rounded-xl p-4 cursor-pointer hover:border-primary/50 transition ${
              email.unread ? "border-primary/30" : "border-border"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-foreground">{email.from}</span>
              <span className="text-xs text-muted-foreground">{email.time}</span>
            </div>
            <p className="text-sm font-medium text-foreground mt-1">{email.subject}</p>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{email.preview}</p>
            <div className="flex gap-2 mt-2">
              {email.unread && (
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">New</span>
              )}
              {email.priority && (
                <span className="text-[10px] bg-destructive/10 text-destructive px-2 py-0.5 rounded-full font-medium">
                  Priority
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="col-span-3 bg-card border border-border rounded-xl p-8 flex flex-col items-center justify-center text-center">
        <div className="flex items-center gap-2 text-primary mb-2">
          <Mail className="w-5 h-5" />
          <MessageSquare className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
          Conversation Intelligence
        </h3>
        <p className="text-muted-foreground text-sm mt-1">Select a thread on the left to view details.</p>
        <p className="text-xs text-muted-foreground mt-3 max-w-sm">
          Start by choosing an email from your inbox. The full conversation, AI brief, and composer will appear here.
        </p>
      </div>
    </div>
  </div>
);

export default CommunicationPage;
