import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./head.css";

export default function Head({ theme, toggleTheme }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate("/login");
  }
  return (
    <header className="nav-wrapper">
      <div className="nav-inner">
        <div className="nav-left">
          <Link to="/" className="nav-logo">
            <span className="logo-dot" />
            <span className="logo-text">eCourse</span>
          </Link>
        </div>
        <nav className="nav-center">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Explore
          </NavLink>

          <NavLink
            to="/my-courses"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            My Courses
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "nav-link nav-link-active" : "nav-link"
            }
          >
            Profile
          </NavLink>
        </nav>
        <div className="nav-right">
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle-btn"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          {user ? (
            <div className="nav-user">
              <div className="avatar">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <button className="nav-btn outline" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-auth-buttons">
              <Link to="/login" className="nav-btn ghost">
                Login
              </Link>
              <Link to="/register" className="nav-btn primary">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
