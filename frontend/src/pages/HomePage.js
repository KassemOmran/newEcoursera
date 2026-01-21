import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import python from "../assets/images/python.jpg";
import laravel from "../assets/images/laravel.jpg";
import react from "../assets/images/react.jpg"

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setFeatured([
      {
        id: 1,
        title: "React for Beginners",
        instructor: "John Smith",
        image: react,
      },
      {
        id: 2,
        title: "Full Laravel Course",
        instructor: "Sarah Johnson",
        image: laravel,
      },
      {
        id: 3,
        title: "Python Programming",
        instructor: "Michael Jordan",
        image: python,
      },
    ]);
  }, []);

  function openCategory(category) {
    navigate("/explore", { state: { category } });
  }

  return (
    <div className="home-container">
      {/* HERO */}
      <section className="hero-section">
        <h1>Unlock Your Future With Knowledge</h1>
        <p>Learn new skills, grow your career, and shape your future.</p>

        <div className="hero-search">
          <input type="text" placeholder="Search for courses..." />
          <button>Search</button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="category-section">
        <h2>Popular Categories</h2>
        <div className="category-grid">
          {["Programming", "Design", "Business", "Marketing", "IT & Software"].map(
            (cat) => (
              <div
                key={cat}
                className="category-card"
                onClick={() => openCategory(cat)}
              >
                {cat}
              </div>
            )
          )}
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured-section">
        <h2>Featured Courses</h2>
        <div className="featured-grid">
          {featured.map((c) => (
            <div key={c.id} className="featured-card">
              <img src={c.thumbnail} alt="" />
              <h3>{c.title}</h3>
              <p>{c.instructor}</p>
              <button
                className="view-btn"
                onClick={() => navigate(`/course/${c.id}`)}
              >
                View Course
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
