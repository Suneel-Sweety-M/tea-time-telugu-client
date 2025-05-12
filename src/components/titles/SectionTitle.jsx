import React from "react";
import "./titles.css";
import { Link } from "react-router-dom";

const SectionTitle = ({ title, nav }) => {
  return (
    <div className="section-title-container">
      <div className="title-text">{title}</div>
      <div className="title-dot"></div>
      <div className="title-line"></div>
      {nav && (
        <Link to={nav} className="title-see-all">
          See All <i className="fa fa-angle-right"></i>
        </Link>
      )}
    </div>
  );
};

export default SectionTitle;
