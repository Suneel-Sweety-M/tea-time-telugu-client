import React, { useState } from "react";
import "../components/dashboard/dashboard.css";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardTopbar from "../components/dashboard/DashboardTopbar";
import DasHome from "../components/dashboard/DasHome";

const Dashboard = () => {
  const [bars, setBars] = useState(false);
  
  return (
    <div className="dashboard-page">
      <div className={bars ? "mobile-left das-left" : "das-left"}>
        <DashboardSidebar setBars={setBars} />
      </div>
      <div className={bars ? "mobile-right das-right" : "das-right"}>
        <DashboardTopbar setBars={setBars} />
        <div className="das-display">
          <DasHome />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
