import React from "react";
import "./coursecard.css";

export default function CourseCard({ course }) {
  return (
    <div className="course-card">
      <img src={course.image} alt={course.title} />
      <h3>{course.title}</h3>
      <p className="instructor">{course.instructor}</p>
      <a className="enroll-btn" href={`/course/${course.id}`}>
        View Course
      </a>
    </div>
  );
}
