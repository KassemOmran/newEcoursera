import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  function handleReset(e) {
    e.preventDefault();
    alert("Password reset link sent to: " + email);
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Reset Password</h1>
        <p className="auth-subtitle">
          Enter your email and we will send you a reset link.
        </p>

        <form onSubmit={handleReset}>
          <div className="auth-input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="example@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="auth-btn">Send Reset Link</button>
        </form>

        <p className="auth-bottom-text">
          Back to{" "}
          <Link to="/login" className="auth-link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
