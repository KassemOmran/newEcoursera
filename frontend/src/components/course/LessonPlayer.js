import React from "react";
import "./lessonplayer.css";

export default function LessonPlayer({ lesson }) {
  if (!lesson) return <div>Select a lesson to begin.</div>;

  return (
    <div className="lesson-player">
      <h3>{lesson.title}</h3>

      <div className="video-container">
        <iframe
          src={lesson.video}
          title="lesson video"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
