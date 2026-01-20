import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosclient";
import "./ExploreCourses.css";

export default function ExploreCourses() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await axiosClient.get("/courses");
        setCourses(data || []);

        // Build categories from backend data
        const uniqueCategories = [
          "All",
          ...new Set(data.map((c) => c.category)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error(err);
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  const filtered = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;

    const matchesQuery =
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.instructor?.name
        ?.toLowerCase()
        .includes(query.toLowerCase());

    return matchesCategory && matchesQuery;
  });

  if (loading) {
    return <div className="explore-container">Loading...</div>;
  }

  if (error) {
    return <div className="explore-container">{error}</div>;
  }

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
            <img src={course.thumbnail} alt={course.title} />
            <h3>{course.title}</h3>
            <p className="instructor">
              {course.instructor?.name || "Unknown Instructor"}
            </p>
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
