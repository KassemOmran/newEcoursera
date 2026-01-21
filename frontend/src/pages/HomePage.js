import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosclient";
import "./HomePage.css";

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchFeatured() {
      try {
        const data = await axiosClient.get("/featured-courses");

        setFeatured(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load featured courses");
      } finally {
        setLoading(false);
      }
    }
    fetchFeatured();
  }, []);

  function openCategory(category) {
    navigate("/explore", { state: { category } });
  }

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home-container">
      {/* HERO */}
      <section className="hero-section">
        <h1>Unlock Your Future With Knowledge</h1>
        <p>Learn new skills, grow your career, and shape your future.</p>

        <div className="hero-search">
          <input
            type="text"
            placeholder="Search for courses..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() =>
              navigate("/explore", { state: { query: searchText } })
            }
          >
            Search
          </button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="category-section">
        <h2>Popular Categories</h2>
        <div className="category-grid">
          {[
            "Programming",
            "Design",
            "Business",
            "Marketing",
            "IT & Software",
          ].map((cat) => (
            <div
              key={cat}
              className="category-card"
              onClick={() => openCategory(cat)}
            >
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured-section">
        <h2>Featured Courses</h2>
        <div className="featured-grid">
          {featured.map((c) => (
            <div key={c.id} className="featured-card">
              <img src={c.thumbnail} alt={c.title} />
              <h3>{c.title}</h3>
              <p>{c.instructor?.name}</p>
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
