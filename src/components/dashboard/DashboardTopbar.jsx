import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashboardTopbar = ({ setBars }) => {
  const { user } = useSelector((state) => state.user);

  return (
    <div className="dashboard-topbar">
      <div className="das-topbar-left">
        <Link to="/" className="das-topbar-left-logo">
          <img src="/assets/ttt-logo.jpg" alt="logo" />
        </Link>
      </div>

      <div className="das-topbar-right">
        <div className="das-topbar-right-user">
          <div className="das-tru-text">
            <b>{user?.fullName}</b>
            <span className="text-capital">{user?.role}</span>
          </div>
          <img src={user?.profileUrl} alt="pic" />
        </div>
        <i className="fa fa-bars" onClick={() => setBars(true)}></i>
      </div>
    </div>
  );
};

export default DashboardTopbar;
