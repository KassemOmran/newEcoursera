import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosclient";
import "./instdashboard.css";

export default function InstDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchInstructorCourses() {
      try {
        const data = await axiosClient.get("/instructor/courses");
        setCourses(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load instructor courses");
      } finally {
        setLoading(false);
      }
    }

    fetchInstructorCourses();
  }, []);

  if (loading) {
    return <div className="dashboard">Loading...</div>;
  }

  if (error) {
    return <div className="dashboard">{error}</div>;
  }

  return (
    <div className="dashboard">
      <h2>Instructor Panel</h2>

      {courses.length === 0 && (
        <p className="no-results">
          You haven’t created any courses yet.
        </p>
      )}

      <div className="dash-grid">
        {courses.map((course) => (
          <div key={course.id} className="dash-card">
            <h3>{course.title}</h3>

            {course.enrollments_count !== undefined && (
              <p>{course.enrollments_count} Students</p>
            )}

            <button
              onClick={() => navigate(`/instructor`)}
              className="manage-btn"
            >
              Manage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
