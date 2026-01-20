import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axiosClient from "../api/axiosclient";
import "./CreateCourse.css";

export default function CreateCourse() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Programming");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(
    "https://source.unsplash.com/600x400/?reactjs,code"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const course = await axiosClient.post("/instructor/courses", {
        title,
        category,
        description,
        thumbnail,
        price: Number(price),
      });

      alert(`Course created: ${course.title}`);
      navigate("/instructor/dashboard");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="create-container">
      <h1 className="create-title">Create a New Course</h1>
      <p className="create-subtitle">
        Fill in the basic details for your course.
      </p>

      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleSubmit} className="create-form">
        <div className="create-field">
          <label>Course Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="create-field">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Programming</option>
            <option>Design</option>
            <option>Business</option>
            <option>Marketing</option>
            <option>IT & Software</option>
          </select>
        </div>

        <div className="create-field">
          <label>Description</label>
          <textarea
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="create-field">
          <label>Price (USD)</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="create-field">
          <label>Thumbnail URL</label>
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />
          <img
            src={thumbnail}
            alt="thumbnail preview"
            style={{ width: "200px", marginTop: "10px" }}
          />
        </div>

        <button className="create-btn" disabled={loading}>
          {loading ? "Saving..." : "Save Course"}
        </button>
      </form>
    </div>
  );
}
