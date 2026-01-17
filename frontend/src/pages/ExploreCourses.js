import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CourseContext } from "../context/CourseContext";
import "./ExploreCourses.css";

export default function ExploreCourses() {
  const { courses, categories } = useContext(CourseContext);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  const filtered = courses.filter(course => {
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;
    const matchesQuery =
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.instructor.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });


  return (
    <div className="explore-container">
      <h1 className="explore-title">Explore Courses</h1>

      <div className="explore-filters">
        <input
          type="text"
          placeholder="Search by title or instructor..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="course-grid">
        {filtered.length === 0 && (
          <p className="no-results">No courses match your search.</p>
        )}

        {filtered.map((course) => (
          <div key={course.id} className="course-card-e">
            <img src={course.thumbnail} alt="" />
            <h3>{course.title}</h3>
            <p className="instructor">{course.instructor.name}</p>
            <p className="price">${course.price}</p>
            <button
              className="view-btn"
              onClick={() => navigate(`/course/${course.id}`)}
            >
              View Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
