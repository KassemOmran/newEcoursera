import React from "react";
import "./instdashboard.css";

export default function InstDashboard({ courses }) {
  return (
    <div className="dashboard">
      <h2>Instructor Panel</h2>

      <div className="dash-grid">
        {courses.map((c) => (
          <div key={c.id} className="dash-card">
            <h3>{c.title}</h3>
            <p>{c.students} Students</p>
            <a href={`/course/${c.id}`}>Manage</a>
          </div>
        ))}
      </div>
    </div>
  );
}
