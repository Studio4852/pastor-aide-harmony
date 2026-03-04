import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import TopBar from "./TopBar";

const AppLayout = ({ onSignOut }: { onSignOut: () => void }) => {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar onSignOut={onSignOut} />
      <div className="ml-60">
        <TopBar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
