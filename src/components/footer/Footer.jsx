import React from "react";
import "./footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="main-page">
      <div className="footer-log-section">
        <span className="footer-logo">
          <img
            src="/assets/new-ttt-logo.jpg"
            alt="logo"
          />
        </span>
        <div className="footer-socials">
          <Link to="/about-us">About Us</Link>
          <Link to="/contact-us">Contact Us</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/adwithus">Advertise With Us</Link>
        </div>
      </div>
      <div className="copyright-section">
        <span className="copyright-text">
          Copyright © 2025 All Rights Reserved by{" "}
          <a href="https://eagleiitech.com" target="blank">
            Eagle Eye Technologies
          </a>
          .
        </span>
        <div className="minbar-socials">
          <a
            href="https://www.facebook.com/profile.php?id=61572501587074"
            target="blank"
          >
            <i className="fa fa-facebook"></i>
          </a>
          <a href="https://www.youtube.com/@TeaTimeTelugu-s8b" target="blank">
            <i className="fa fa-youtube"></i>
          </a>
          <a href="https://x.com/TeaTimeTelugu" target="blank">
            <i className="fa fa-x"></i>
          </a>
          <a href="https://www.instagram.com/teatime_telugu/" target="blank">
            <i className="fa fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
