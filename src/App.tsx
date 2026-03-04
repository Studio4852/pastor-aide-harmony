import { useState, useCallback } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import SchedulePage from "./pages/SchedulePage";
import CommunicationPage from "./pages/CommunicationPage";
import SermonsPage from "./pages/SermonsPage";
import EventsPage from "./pages/EventsPage";
import ReportsPage from "./pages/ReportsPage";
import HealthPage from "./pages/HealthPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = useCallback(() => setLoggedIn(true), []);
  const handleSignOut = useCallback(() => setLoggedIn(false), []);

  if (!loggedIn) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <LoginPage onLogin={handleLogin} />
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout onSignOut={handleSignOut} />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/schedule" element={<SchedulePage />} />
              <Route path="/communication" element={<CommunicationPage />} />
              <Route path="/sermons" element={<SermonsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/health" element={<HealthPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
