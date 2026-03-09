import { useState } from "react";
import { Mail, MessageSquare, Send, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const tabs = ["Inbox", "Drafts", "Outbox/Queue", "Important Dates"];
const filters = ["All", "Unread", "High Priority"];

const emails = [
  {
    from: "Elder James",
    subject: "Budget Review Meeting",
    preview: "Pastor, I've attached the Q1 financial summary for your review before Thursday's...",
    body: "Pastor, I've attached the Q1 financial summary for your review before Thursday's meeting. The numbers look strong — giving is up 12% compared to last quarter. Please let me know if you'd like to discuss before the meeting.",
    time: "9:15 AM",
    unread: true,
    priority: true,
  },
  {
    from: "Youth Ministry",
    subject: "Conference Registration Update",
    preview: "We've reached 85% capacity for the youth conference. Need approval to open waitlist...",
    body: "We've reached 85% capacity for the youth conference. Need approval to open waitlist and extend the registration deadline by one week. The team is excited about the turnout so far!",
    time: "8:42 AM",
    unread: true,
    priority: false,
  },
  {
    from: "Media Team",
    subject: "Sunday Service Recording",
    preview: "The edited version of last Sunday's sermon is ready for review and upload...",
    body: "The edited version of last Sunday's sermon is ready for review and upload to YouTube and the podcast. Thumbnails and descriptions are prepared. Awaiting your final approval.",
    time: "Yesterday",
    unread: false,
    priority: false,
  },
  {
    from: "Pastoral Care",
    subject: "Hospital Visit Schedule",
    preview: "Three members are currently hospitalized. Coordinated visit schedule attached...",
    body: "Three members are currently hospitalized. Coordinated visit schedule attached. Sister Martha is recovering well. Brother David requests prayer. Mrs. Johnson's family asked if you could visit Wednesday afternoon.",
    time: "Yesterday",
    unread: false,
    priority: true,
  },
];

const CommunicationPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const filteredEmails = emails.filter((e) => {
    if (activeFilter === 1) return e.unread;
    if (activeFilter === 2) return e.priority;
    return true;
  });

  const handleReply = () => {
    if (!replyText.trim()) return;
    toast({ title: "Reply Sent", description: `Your reply to ${emails[selectedEmail!].from} has been sent.` });
    setReplyText("");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Communication <span className="text-primary">Intelligence</span>
          </h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1.5 text-sm">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-success font-medium">Sync Status: Connected</span>
            </span>
            <span className="text-sm text-muted-foreground bg-secondary px-3 py-0.5 rounded-full">Unread: {emails.filter(e => e.unread).length}</span>
          </div>
        </div>
        <button onClick={() => toast({ title: "Compose", description: "Opening new message composer..." })} className="gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 shadow-md transition">
          <Send className="w-4 h-4" /> Compose
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 md:gap-6 border-b border-border pb-0 overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => { setActiveTab(i); toast({ title: tab, description: `Switched to ${tab}.` }); }}
            className={`pb-3 text-sm font-medium border-b-2 transition ${
              activeTab === i ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
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
            onClick={() => setActiveFilter(i)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              activeFilter === i ? "gradient-primary text-white shadow-sm" : "text-muted-foreground hover:bg-secondary"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Email list + detail */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-2 space-y-2">
          {filteredEmails.map((email, idx) => {
            const originalIdx = emails.indexOf(email);
            return (
              <div
                key={email.subject}
                onClick={() => setSelectedEmail(originalIdx)}
                className={`glass-card rounded-xl p-4 cursor-pointer transition ${
                  selectedEmail === originalIdx ? "border-primary ring-1 ring-primary/30" : email.unread ? "border-primary/30" : ""
                } hover:border-primary/50`}
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
                    <span className="text-[10px] bg-destructive/10 text-destructive px-2 py-0.5 rounded-full font-medium">Priority</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="md:col-span-3 glass-card rounded-xl p-6">
          {selectedEmail !== null ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-foreground">{emails[selectedEmail].subject}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                  <Mail className="w-4 h-4" /> From: <span className="font-medium text-foreground">{emails[selectedEmail].from}</span>
                  <span className="ml-auto flex items-center gap-1"><Clock className="w-3 h-3" /> {emails[selectedEmail].time}</span>
                </p>
              </div>
              <div className="border-t border-border pt-4">
                <p className="text-sm text-foreground leading-relaxed">{emails[selectedEmail].body}</p>
              </div>
              <div className="border-t border-border pt-4 space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Quick Reply</h4>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply..."
                  className="w-full bg-secondary/50 rounded-lg p-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-1 focus:ring-primary resize-none h-20"
                />
                <div className="flex gap-2">
                  <button onClick={handleReply} className="gradient-primary text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:opacity-90 shadow-sm transition">
                    <Send className="w-4 h-4" /> Send Reply
                  </button>
                  <button onClick={() => toast({ title: "AI Draft", description: "Generating AI-powered response..." })} className="bg-secondary text-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-muted transition">
                    AI Draft
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full min-h-[300px]">
              <div className="flex items-center gap-2 text-primary mb-2">
                <Mail className="w-5 h-5" />
                <MessageSquare className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-primary">
                Conversation Intelligence
              </h3>
              <p className="text-muted-foreground text-sm mt-1">Select a thread on the left to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunicationPage;
