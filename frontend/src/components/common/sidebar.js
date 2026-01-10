import React from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar-wrapper">
      <div className="sidebar-inner">
        <h3 className="sidebar-title">Dashboard</h3>
        <nav className="sidebar-links">
          <NavLink
            to="/my-courses"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            My Courses
          </NavLink>
          <NavLink
            to="/create-course"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            Create Course
          </NavLink>
          <NavLink
            to="/certificates"
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            Certificates
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}
