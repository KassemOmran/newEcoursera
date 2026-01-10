import React, { useState } from "react";
import "./CreateCourse.css";

export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Programming");
  const [description, setDescription] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    alert(
      `Course created (fake):\nTitle: ${title}\nCategory: ${category}\nDescription: ${description}`
    );

    setTitle("");
    setCategory("Programming");
    setDescription("");
  }

  return (
    <div className="create-container">
      <h1 className="create-title">Create a New Course</h1>
      <p className="create-subtitle">
        Fill in the basic details for your course.
      </p>

      <form onSubmit={handleSubmit} className="create-form">
        <div className="create-field">
          <label>Course Title</label>
          <input
            type="text"
            placeholder="e.g. Advanced React Patterns"
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
            placeholder="Describe what students will learn..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <button className="create-btn">Save Course</button>
      </form>
    </div>
  );
}
