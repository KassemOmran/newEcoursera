import React from "react";
import "./progchart.css";

export default function ProgChart({ percent = 0 }) {
  // Clamp value between 0 and 100
  const safePercent = Math.max(0, Math.min(100, Number(percent)));

  return (
    <div className="chart" aria-label={`Progress: ${safePercent}%`}>
      <div
        className="chart-fill"
        style={{ width: `${safePercent}%` }}
      ></div>
      <span>{safePercent}%</span>
    </div>
  );
}
