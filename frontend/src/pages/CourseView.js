import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCourse } from "../api/courses"; // make sure this points to your API functions
import "./CourseView.css";

export default function CourseView() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  useEffect(() => {
  async function fetchCourse() {
    setLoading(true);
    try {
      const data = await getCourse(id); // data = { course, lessons }
      setCourse(data.course);
      setLessons(data.lessons || []);
      setSelectedLesson(data.lessons?.[0] || null);
    } catch (err) {
      console.error(err);
      setError("Failed to load course");
    } finally {
      setLoading(false);
    }
  }

  fetchCourse();
}, [id]);


  if (loading) return <div className="course-view-container">Loading...</div>;
  if (error) return <div className="course-view-container">{error}</div>;

  return (
    <div className="course-view-container">
      <div className="course-header">
        <img src={course.image} alt={course.title} />
        <div>
          <h1>{course.title}</h1>
          <p className="course-instructor">By {course.instructor}</p>
          <p className="course-description">{course.description}</p>
          <button className="enroll-btn">Enroll Now</button>
        </div>
      </div>

      <h2 className="lessons-title">Lessons</h2>
      <div className="course-layout">
        <div className="lessons-list">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className={
                selectedLesson?.id === lesson.id
                  ? "lesson-item active"
                  : "lesson-item"
              }
              onClick={() => setSelectedLesson(lesson)}
            >
              {lesson.title}
            </div>
          ))}
        </div>

        <div className="lesson-player">
          {selectedLesson ? (
            <>
              <h3>Now Playing:</h3>
              <p>{selectedLesson.title}</p>
              <div className="lesson-video-placeholder">
                <span>Video player placeholder</span>
              </div>
            </>
          ) : (
            <p>Select a lesson to start.</p>
          )}
        </div>
      </div>
    </div>
  );
}
