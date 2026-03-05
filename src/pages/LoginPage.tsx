import { useState } from "react";
import { Sparkles, LogIn } from "lucide-react";

const LoginPage = ({ onLogin }: { onLogin: () => void }) => {
  const [signingIn, setSigningIn] = useState(false);

  const handleSignIn = () => {
    setSigningIn(true);
    setTimeout(onLogin, 1500);
  };

  return (
    <div className="min-h-screen login-dark flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-xl gold-glow">
          <Sparkles className="w-8 h-8 text-primary-foreground" />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold" style={{ color: 'hsl(0 0% 15%)' }}>
            {signingIn ? "Welcome back" : "PPA"}
          </h1>
          <p className="mt-2" style={{ color: 'hsl(0 0% 45%)' }}>
            {signingIn ? "Signing you in..." : "AI-Powered Executive Intelligence"}
          </p>
        </div>

        <div className="flex items-center gap-2 border rounded-full px-6 py-2.5 mt-2" style={{ borderColor: 'hsl(40 80% 50% / 0.4)' }}>
          <Sparkles className="w-4 h-4" style={{ color: 'hsl(40 80% 45%)' }} />
          <span className="font-medium text-sm" style={{ color: 'hsl(40 80% 45%)' }}>AI-Powered Executive Intelligence</span>
        </div>

        {signingIn ? (
          <div className="mt-4 w-48 h-1 rounded-full overflow-hidden" style={{ background: 'hsl(0 0% 88%)' }}>
            <div className="h-full gradient-primary rounded-full animate-pulse" style={{ width: '70%' }} />
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="mt-4 gradient-primary text-primary-foreground font-semibold px-8 py-3 rounded-full flex items-center gap-2 shadow-lg gold-glow hover:opacity-90 transition"
          >
            <LogIn className="w-4 h-4" />
            Sign In to PPA
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
