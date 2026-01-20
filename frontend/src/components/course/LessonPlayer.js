import React from "react";
import "./lessonplayer.css";

export default function LessonPlayer({ lesson }) {
  if (!lesson) {
    return (
      <div className="lesson-player empty">
        <p>Select a lesson to begin.</p>
      </div>
    );
  }
  console.log(lesson);

  return (
    <div className="lesson-player">
      <h3>{lesson.title}</h3>

      {lesson.video_url ? (
        
        <div className="video-container">
          <iframe
            src={lesson.video_url}
            title={lesson.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p className="no-video">No video available for this lesson.</p>
      )}

      {lesson.description && (
        <p className="lesson-description">
          {lesson.description}
        </p>
      )}
    </div>
  );
}
