import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosclient";
import useAuth from "../hooks/useAuth";
import CourseBuilder from "../components/course/CourseBuilder";
import "./InstructorDashboard.css";

export default function InstructorDashboard() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Protect route
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data = await axiosClient.get("/instructor/courses");
        setCourses(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load instructor courses");
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, []);

  async function handleDelete(courseId) {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      await axiosClient.delete(`/instructor/courses/${courseId}`);
      setCourses((prev) => prev.filter((c) => c.id !== courseId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete course");
    }
  }

  async function handleAddLesson(courseId, lesson) {
    try {
      const newLesson = await axiosClient.post(
        `/courses/${courseId}/lessons`,
        lesson,
      );

      setCourses((prev) =>
        prev.map((course) =>
          course.id === courseId
            ? {
                ...course,
                lessons: [...(course.lessons || []), newLesson],
              }
            : course,
        ),
      );
    } catch (err) {
      console.error(err);
      alert("Failed to add lesson");
    }
  }

  async function handleDeleteQuiz(lessonId) {
  if (!window.confirm("Are you sure you want to delete this quiz?")) return;

  try {
    await axiosClient.delete(`/lessons/${lessonId}/quiz`);

    // Update state to remove quiz from the lesson
    setCourses((prev) =>
      prev.map((course) => ({
        ...course,
        lessons: course.lessons.map((lesson) =>
          lesson.id === lessonId ? { ...lesson, quiz: null } : lesson
        ),
      }))
    );
  } catch (err) {
    console.error(err);
    alert("Failed to delete quiz");
  }
}

  async function handleDeleteLesson(lessonId) {
    if (!window.confirm("Are you sure you want to delete this lesson?")) return;

    try {
      await axiosClient.delete(`/lessons/${lessonId}`);

      // Update state to remove lesson from course
      setCourses((prev) =>
        prev.map((course) => ({
          ...course,
          lessons: course.lessons.filter((lesson) => lesson.id !== lessonId),
        })),
      );
    } catch (err) {
      console.error(err);
      alert("Failed to delete lesson");
    }
  }

  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  if (error) {
    return <div className="dashboard-container">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">My Courses</h1>
      <p className="dashboard-subtitle">Manage your courses below</p>

      <Link to="/instructor/create">
        <button className="dashboard-btn">+ Create New Course</button>
      </Link>

      {courses.length === 0 && (
        <p className="no-results">You haven’t created any courses yet.</p>
      )}

      <div>
        {courses.map((course) => (
          <div key={course.id} className="dashboard-card">
            <h3>{course.title}</h3>
            <p>
              <strong>Category:</strong> {course.category}
            </p>
            <p>{course.description}</p>

            {/* Lessons */}
            <ul>
              {(course.lessons || []).map((lesson) => (
                <li key={lesson.id}>
                  {lesson.order}. {lesson.title}
                  {/* If quiz exists */}
                  {lesson.quiz ? (
                    <>
                      <button
                        onClick={() => handleDeleteQuiz(lesson.id)}
                        className="btn btn-danger"
                      >
                        Delete Quiz
                      </button>
                      <button
                        onClick={() => handleDeleteLesson(lesson.id)}
                        className="btn btn-outline"
                      >
                        Delete Lesson
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to={`/instructor/lessons/${lesson.id}/quiz`}>
                        <button
                          className="dashboard-btn"
                          style={{ marginTop: "10px" }}
                        >
                          Create Quiz
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteLesson(lesson.id)}
                        className="btn btn-outline"
                      >
                        Delete Lesson
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>

            {/* Add lesson */}
            <CourseBuilder
              onAddLesson={(lesson) => handleAddLesson(course.id, lesson)}
            />

            

            <button
              className="dashboard-btn"
              style={{ background: "red", marginTop: "10px" }}
              onClick={() => handleDelete(course.id)}
            >
              Delete Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
