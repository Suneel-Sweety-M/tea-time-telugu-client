import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import {
  sendAdminForgotPassword,
  sendWriterForgotPassword,
} from "../helper/apis";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("writer"); // default role
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Email is required.");
      return;
    }

    try {
      const response =
        role === "admin"
          ? await sendAdminForgotPassword({ email, role })
          : await sendWriterForgotPassword({ email, role });
      if (response.status !== "success") {
        setError(response?.message);
        return;
      }

      setMessage(response?.message);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-page forgot-password-page">
        <h2 className="forgot-password-title">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="forgot-password-input-group">
            <label>Email:</label>
            <input
              type="email"
              className="forgot-password-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="forgot-password-input-group">
            <label>Select Role:</label>
            <select
              className="forgot-password-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="writer">Writer</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="forgot-password-button">
            Send Reset Request
          </button>

          {message && <p className="forgot-password-message">{message}</p>}
          {error && <p className="forgot-password-error">{error}</p>}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ForgotPassword;
