import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosclient";
import ProgChart from "./ProgChart";
import "./stdashboard.css";

export default function StdDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchMyCourses() {
      try {
        const data = await axiosClient.get("/my-courses");
        setCourses(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load your courses");
      } finally {
        setLoading(false);
      }
    }

    fetchMyCourses();
  }, []);

  if (loading) {
    return <div className="dashboard">Loading...</div>;
  }

  if (error) {
    return <div className="dashboard">{error}</div>;
  }

  return (
    <div className="dashboard">
      <h2>Your Progress</h2>

      {courses.length === 0 && (
        <p className="no-results">
          You are not enrolled in any courses yet.
        </p>
      )}

      <div className="dash-grid">
        {courses.map((course) => (
          <div key={course.id} className="dash-card">
            <h3>{course.title}</h3>

            <ProgChart percent={course.progress ?? 0} />

            <button
              className="continue-btn"
              onClick={() => navigate(`/course/${course.id}`)}
            >
              Continue
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
