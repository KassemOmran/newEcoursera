import React from "react";
import "./coursedetails.css";

export default function CourseDetails({ course }) {
  if (!course) return null;

  return (
    <div className="course-details">
      <h2>{course.title}</h2>

      <p className="instructor">
        Instructor: {course.instructor?.name || "Unknown Instructor"}
      </p>

      {course.category && (
        <p className="category">
          Category: {course.category}
        </p>
      )}

      {course.price !== undefined && (
        <p className="price">
          Price: ${course.price}
        </p>
      )}

      <p className="description">{course.description}</p>
    </div>
  );
}
