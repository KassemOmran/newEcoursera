import React from "react";
import "./MyCourses.css";

export default function MyCourses() {
  const myCourses = [
    {
      id: 1,
      title: "React Mastery",
      progress: 45,
      image: "https://source.unsplash.com/600x400/?react,code",
    },
    {
      id: 2,
      title: "Laravel Bootcamp",
      progress: 70,
      image: "https://source.unsplash.com/600x400/?php,laravel",
    },
  ];

  return (
    <div className="mycourses-container">
      <h1 className="mycourses-title">My Courses</h1>
      <p className="mycourses-subtitle">Continue where you left off.</p>

      <div className="mycourses-grid">
        {myCourses.map((course) => (
          <div key={course.id} className="mycourse-card">
            <img src={course.image} alt="" />
            <h3>{course.title}</h3>

            <div className="progress-bar">
              <div
                className="fill"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <p className="progress-text">{course.progress}% completed</p>

            <a href={`/course/${course.id}`} className="continue-btn">
              Continue →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
