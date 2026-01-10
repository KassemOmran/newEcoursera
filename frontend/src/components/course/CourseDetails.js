import React from "react";
import "./coursedetails.css";

export default function CourseDetails({ course }) {
  return (
    <div className="course-details">
      <h2>{course.title}</h2>
      <p className="instructor">Instructor: {course.instructor}</p>
      <p>{course.description}</p>
    </div>
  );
}
