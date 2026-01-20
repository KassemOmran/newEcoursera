import React, { useEffect, useState } from "react";
import axiosClient from "../api/axiosclient";
import "./MyCourses.css";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    return <div className="mycourses-container">Loading...</div>;
  }

  if (error) {
    return <div className="mycourses-container">{error}</div>;
  }

  return (
    <div className="mycourses-container">
      <h1 className="mycourses-title">My Courses</h1>
      <p className="mycourses-subtitle">Continue where you left off.</p>

      {courses.length === 0 && (
        <p className="no-results">You are not enrolled in any courses yet.</p>
      )}

      <div className="mycourses-grid">
        {courses.map((course) => (
          <div key={course.id} className="mycourse-card">
            <img src={course.thumbnail} alt={course.title} />
            <h3>{course.title}</h3>

            <div className="progress-bar">
              <div
                className="fill"
                style={{ width: `${course.progress ?? 0}%` }}
              ></div>
            </div>

            <p className="progress-text">
              {course.progress ?? 0}% completed
            </p>

            <a
              href={`/course/${course.id}`}
              className="continue-btn"
            >
              Continue →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
