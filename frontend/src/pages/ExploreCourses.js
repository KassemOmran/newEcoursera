import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ExploreCourses.css";

export default function ExploreCourses() {
  const location = useLocation();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.category || "All"
  );

  useEffect(() => {
    setCourses([
      {
        id: 1,
        title: "React for Beginners",
        category: "Programming",
        instructor: "John Smith",
        price: 29,
        image: "https://source.unsplash.com/600x400/?react,code",
      },
      {
        id: 2,
        title: "Laravel From Scratch",
        category: "Programming",
        instructor: "Sarah Johnson",
        price: 35,
        image: "https://source.unsplash.com/600x400/?php,laravel",
      },
      {
        id: 3,
        title: "UI/UX Design Basics",
        category: "Design",
        instructor: "Emily Clark",
        price: 25,
        image: "https://source.unsplash.com/600x400/?design,ui",
      },
      {
        id: 4,
        title: "Digital Marketing 101",
        category: "Marketing",
        instructor: "David Brown",
        price: 19,
        image: "https://source.unsplash.com/600x400/?marketing",
      },
    ]);
  }, []);

  const categories = ["All", "Programming", "Design", "Business", "Marketing", "IT & Software"];

  const filtered = courses.filter((course) => {
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
            <img src={course.image} alt="" />
            <h3>{course.title}</h3>
            <p className="instructor">{course.instructor}</p>
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
