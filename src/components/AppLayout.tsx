import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import TopBar from "./TopBar";
import { useIsMobile } from "@/hooks/use-mobile";

const AppLayout = ({ onSignOut }: { onSignOut: () => void }) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [location.pathname, isMobile]);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - hidden off-screen on mobile when closed */}
      {(!isMobile || sidebarOpen) && (
        <div className={isMobile ? "fixed inset-y-0 left-0 z-50 w-60" : ""}>
          <AppSidebar onSignOut={onSignOut} onNavigate={() => isMobile && setSidebarOpen(false)} />
        </div>
      )}

      <div className={isMobile ? "" : "ml-60"}>
        <TopBar
          onMenuToggle={isMobile ? () => setSidebarOpen((o) => !o) : undefined}
        />
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
