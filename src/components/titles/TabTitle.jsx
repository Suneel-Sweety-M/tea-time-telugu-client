import React from "react";
import "./titles.css";

const TabTitle = ({ title }) => {
  return (
    <div className="tab-title-container">
      <h1 className="text-capital">{title}</h1>
    </div>
  );
};

export default TabTitle;
