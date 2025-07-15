import React, { useEffect, useState } from "react";
import { resetAdminPassword } from "../helper/apis";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [seePassword, setSeePassword] = useState(false);

  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await resetAdminPassword(token, { password: newPassword });
      if (response.status !== "success") {
        setError(response?.message);
        return;
      }

      setMessage(response?.message);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing token.");
      navigate("/forgot-password");
    }
  }, [navigate, token]);
  return (
    <>
      <Navbar />
      <div className="main-page forgot-password-page">
        <h2 className="forgot-password-title">Reset Password</h2>
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="forgot-password-input-group forgot-password-input-group1">
            <label>New Password:</label>
            <input
              type={seePassword ? "text" : "password"}
              className="forgot-password-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
            />
            <span
              className="see-password-icon1"
              onClick={() => setSeePassword(!seePassword)}
            >
              {seePassword ? (
                <i className="fa fa-eye"></i>
              ) : (
                <i className="fa fa-eye-slash"></i>
              )}
            </span>
          </div>

          <div className="forgot-password-input-group forgot-password-input-group2">
            <label>Confirm New Password:</label>
            <input
              type={seePassword ? "text" : "password"}
              className="forgot-password-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
            />
            <span
              className="see-password-icon2"
              onClick={() => setSeePassword(!seePassword)}
            >
              {seePassword ? (
                <i className="fa fa-eye"></i>
              ) : (
                <i className="fa fa-eye-slash"></i>
              )}
            </span>
          </div>

          <button type="submit" className="forgot-password-button">
            Reset Password
          </button>

          {message && <p className="forgot-password-message">{message}</p>}
          {error && <p className="forgot-password-error">{error}</p>}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ResetPassword;
