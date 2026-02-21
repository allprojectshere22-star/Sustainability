import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#0F0E47] text-white">
      <DashboardNavbar />

      {/* THIS IS REQUIRED */}
      <div className="pt-20 px-8">
        <Outlet />
      </div>
    </div>
  );
}
