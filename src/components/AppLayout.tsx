import { useState } from "react";
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import TopBar from "./TopBar";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const AppLayout = ({ onSignOut }: { onSignOut: () => void }) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isMobile
            ? `fixed z-40 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`
            : ""
        }`}
      >
        <AppSidebar onSignOut={onSignOut} onNavigate={() => isMobile && setSidebarOpen(false)} />
      </div>

      <div className={isMobile ? "" : "ml-60"}>
        <TopBar
          onMenuToggle={isMobile ? () => setSidebarOpen(!sidebarOpen) : undefined}
        />
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
