import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {login as loginApi} from "../../api/auth";
import "./LoginForm.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    try {
          const res = await loginApi(
            email,
            password,
          );
          localStorage.setItem("ecourse_token", res.token);
          login(res.user);
          navigate("/");
        } catch (error) {
          console.error(error);
          alert("Registration failed");
        }
    setLoading(false);
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Log in to continue learning</p>
        <form onSubmit={handleLogin}>
          <div className="auth-input-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="auth-input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <Link to="/forget-pass" className="auth-forgot">
            Forgot password?
          </Link>
        </form>
        <p className="auth-bottom-text">
          Don't have an account?{" "}
          <Link to="/register" className="auth-link">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
