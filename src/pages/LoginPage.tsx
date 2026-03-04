import { useEffect } from "react";
import { Sparkles } from "lucide-react";

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  // Auto-login after brief splash
  useEffect(() => {
    const timer = setTimeout(onLogin, 1800);
    return () => clearTimeout(timer);
  }, [onLogin]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-xl gold-glow">
          <Sparkles className="w-8 h-8 text-primary-foreground" />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Pastor Paul</h1>
          <p className="text-muted-foreground mt-2">Signing you in automatically...</p>
        </div>
        <div className="flex items-center gap-2 border border-primary/30 rounded-full px-6 py-2.5 mt-4 gold-glow">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-primary font-medium text-sm">AI-Powered Executive Intelligence</span>
        </div>
        <div className="mt-4 w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full gradient-primary rounded-full animate-pulse" style={{ width: '60%' }} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
