import React, { useState } from "react";

export default function CourseBuilder({ onAddLesson }) {
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState("");
  const [order, setOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title || !video || !order) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      await onAddLesson({
        title,
        video,
        order: Number(order),
      });

      setTitle("");
      setVideo("");
      setOrder("");
    } catch (err) {
      console.error(err);
      setError("Failed to add lesson");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="builder-container">
      <h3>Add New Lesson</h3>

      {error && <p className="auth-error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Lesson title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Video URL"
          value={video}
          onChange={(e) => setVideo(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Lesson order (e.g. 1)"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Lesson"}
        </button>
      </form>
    </div>
  );
}
