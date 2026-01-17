import React, { useState } from "react";
import "./CreateCourse.css";
import { createCourse } from "../api/courses";

export default function CreateCourse() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Programming");
  const [description, setDescription] = useState("");
  const [price,setPrice] = useState(0);
  const [thumbnail, setThumbnail] = useState(
    "https://source.unsplash.com/600x400/?reactjs,code"
  );

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await createCourse({
        title,
        category,
        description,
        image: thumbnail,
        price,
      });
      console.log("CreateCourse result:", response);

      alert(
        `Course created:\nTitle: ${response.title}\nCategory: ${response.category}`
      );

      // Reset form
      setTitle("");
      setCategory("Programming");
      setDescription("");
      setThumbnail("https://source.unsplash.com/600x400/?reactjs,code");
    } catch (err) {
      console.error(err);
      alert("Error creating course");
    }
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
        <div className="create-field">
          <label>Price (USD)</label>
          <input
            type="number"
            step="0.01"
            placeholder="e.g. 49.99"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="create-field">
          <label>Thumbnail URL</label>
          <input
            type="text"
            placeholder="Paste an image URL"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />
          <small>Preview:</small>
          <img
            src={thumbnail}
            alt="thumbnail preview"
            style={{ width: "200px", marginTop: "10px" }}
          />
        </div>

        <button className="create-btn">Save Course</button>
      </form>
    </div>
  );
}
