import React, { useState } from "react";
import "./dashboard.css";
import AddWriter from "./sub-elements/AddWriter";
import DashboardSidebar from "./DashboardSidebar";
import DashboardTopbar from "./DashboardTopbar";

const DashAddWriter = () => {
  const [bars, setBars] = useState(false);

  return (
    <div className="dashboard-page">
      <div className={bars ? "mobile-left das-left" : "das-left"}>
        <DashboardSidebar setBars={setBars} />
      </div>
      <div className={bars ? "mobile-right das-right" : "das-right"}>
        <DashboardTopbar setBars={setBars} />
        <div className="das-display">
          <AddWriter />
        </div>
      </div>
    </div>
  );
};

export default DashAddWriter;
