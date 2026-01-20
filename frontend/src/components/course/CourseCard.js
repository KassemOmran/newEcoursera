import React from "react";
import { useNavigate } from "react-router-dom";
import "./coursecard.css";

export default function CourseCard({ course }) {
  const navigate = useNavigate();

  return (
    <div className="course-card">
      <img
        src={course.thumbnail}
        alt={course.title}
      />

      <h3>{course.title}</h3>

      <p className="instructor">
        {course.instructor?.name || "Unknown Instructor"}
      </p>

      {course.price !== undefined && (
        <p className="price">${course.price}</p>
      )}

      <button
        className="enroll-btn"
        onClick={() => navigate(`/course/${course.id}`)}
      >
        View Course
      </button>
    </div>
  );
}
