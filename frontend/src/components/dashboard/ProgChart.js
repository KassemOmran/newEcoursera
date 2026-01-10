import React from "react";
import "./progchart.css";

export default function ProgChart({ percent }) {
  return (
    <div className="chart">
      <div
        className="chart-fill"
        style={{ width: `${percent}%` }}
      ></div>
      <span>{percent}%</span>
    </div>
  );
}
