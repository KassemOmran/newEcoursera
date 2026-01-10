import React, { useState } from "react";
import "./coursebuilder.css";

export default function CourseBuilder({ onAddLesson }) {
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState("");

  function addLesson() {
    if (!title || !video) return;
    onAddLesson({ title, video });
    setTitle("");
    setVideo("");
  }

  return (
    <div className="builder-container">
      <h3>Add New Lesson</h3>
      <input
        type="text"
        placeholder="Lesson title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Video URL"
        value={video}
        onChange={(e) => setVideo(e.target.value)}
      />

      <button onClick={addLesson}>Add Lesson</button>
    </div>
  );
}
