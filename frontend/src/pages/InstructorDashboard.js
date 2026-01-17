import React, { useEffect, useState } from "react";
import {
  getInstructorCourses,
  deleteCourse,
  createLesson,
} from "../api/courses";
import { Link } from "react-router-dom";
import CourseBuilder from "../components/course/CourseBuilder"; // lesson adder
import "./InstructorDashboard.css";


export default function InstructorDashboard() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const res = await getInstructorCourses();
      setCourses(res.data || res);
    }
    fetchCourses();
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    await deleteCourse(id);
    setCourses(courses.filter((c) => c.id !== id));
  }

  async function handleAddLesson(courseId, lesson) {
    try {
      const res = await createLesson(courseId, lesson);
      setCourses(
        courses.map((c) =>
          c.id === courseId
            ? { ...c, lessons: [...(c.lessons || []), res.data] }
            : c
        )
      );
    } catch (err) {
      console.error(err);
      alert("Error adding lesson");
    }
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">My Courses</h1>
      <p className="dashboard-subtitle">Manage your courses below</p>

      <Link to="/instructor/create">
        <button className="dashboard-btn">+ Create New Course</button>
      </Link>

      <div>
        {Array.isArray(courses) &&
          courses.map((course) => (
            <div key={course.id} className="dashboard-card">
              <h3>{course.title}</h3>
              <p>
                <strong>Category:</strong> {course.category}
              </p>
              <p>{course.description}</p>

              {/* Existing lessons */}
              <ul>
                {Array.isArray(course.lessons) &&
                  course.lessons.map((lesson) => (
                    <li key={lesson.id}>
                      {lesson.order}. {lesson.title} – {lesson.video}
                    </li>
                  ))}
              </ul>

              {/* Lesson adder */}
              <CourseBuilder
                onAddLesson={(lesson) => handleAddLesson(course.id, lesson)}
              />
              <Link to={`/instructor/courses/${course.id}/quizzes`}>
                <button className="dashboard-btn" style={{ marginTop: "10px" }}>
                  Manage Quizzes
                </button>
              </Link>

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
