import React, { useState } from "react";
import "./dashboard.css";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";
import DasAllNews from "./sub-elements/DasAllNews";

const DashAllNews = () => {
  const [bars, setBars] = useState(false);

  return (
    <div className="dashboard-page">
      <div className={bars ? "mobile-left das-left" : "das-left"}>
        <DashboardSidebar setBars={setBars} />
      </div>
      <div className={bars ? "mobile-right das-right" : "das-right"}>
        <DashboardTopbar setBars={setBars} />
        <div className="das-display">
          <DasAllNews />
        </div>
      </div>
    </div>
  );
};

export default DashAllNews;
