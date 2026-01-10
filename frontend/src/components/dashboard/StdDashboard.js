import React from "react";
import "./stdashboard.css";

export default function StudentDashboard({ courses }) {
  return (
    <div className="dashboard">
      <h2>Your Progress</h2>

      <div className="dash-grid">
        {courses.map((c) => (
          <div key={c.id} className="dash-card">
            <h3>{c.title}</h3>
            <p>Progress: {c.progress}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
