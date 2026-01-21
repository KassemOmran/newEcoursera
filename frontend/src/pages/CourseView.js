import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosclient";
import useAuth from "../hooks/useAuth";
import LessonPlayer from "../components/course/LessonPlayer";
import "./CourseView.css";

export default function CourseView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrolling, setEnrolling] = useState(false);
  const [certificateLoading, setCertificateLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const courseData = await axiosClient.get(`/courses/${id}`);
        setCourse(courseData.course);
        setLessons(courseData.lessons || []);
        setSelectedLesson(courseData.lessons?.[0] || null);

        if (isAuthenticated) {
          try {
            const status = await axiosClient.get(`/courses/${id}/status`);
            setIsEnrolled(status.enrolled);

            const progress = await axiosClient.get(`/courses/${id}/progress`);
            setCompletedLessons(progress.completed_lessons || []);
          } catch {
            setIsEnrolled(false);
            setCompletedLessons([]);
          }
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load course");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id, isAuthenticated]);

  async function handleEnroll() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setEnrolling(true);
    try {
      await axiosClient.post(`/courses/${id}/enroll`);
      alert("Successfully enrolled!");
      setIsEnrolled(true);
    } catch (err) {
      console.error(err);
      alert("Enrollment failed");
    } finally {
      setEnrolling(false);
    }
  }
  async function handleUnenroll() {
    setEnrolling(true);
    try {
      await axiosClient.delete(`/courses/${id}/enroll`);
      alert("You have unenrolled from this course.");
      setIsEnrolled(false);
      setCompletedLessons([]);
      setSelectedLesson(null);
    } catch (err) {
      console.error(err);
      alert("Unenrollment failed");
    } finally {
      setEnrolling(false);
    }
  }

  async function markCompleted(lessonId) {
    try {
      await axiosClient.post(`/lessons/${lessonId}/complete`);
      setCompletedLessons((prev) =>
        prev.includes(lessonId) ? prev : [...prev, lessonId],
      );
    } catch (err) {
      console.error(err);
      alert("Failed to mark lesson complete");
    }
  }

  async function generateCertificate() {
    setCertificateLoading(true);
    try {
      await axiosClient.post(`/courses/${id}/certificate`);
      alert("Certificate generated!");
      navigate("/certificates");
    } catch (err) {
      console.error(err);
      alert("Failed to generate certificate");
    } finally {
      setCertificateLoading(false);
    }
  }

  if (loading) return <div className="course-view-container">Loading...</div>;
  if (error) return <div className="course-view-container">{error}</div>;

  const courseCompleted =
    lessons.length > 0 && completedLessons.length === lessons.length;

  return (
    <div className="course-view-container">
      {/* HEADER */}
      <div className="course-header">
        <img src={course.thumbnail} alt={course.title} />
        <div>
          <h1>{course.title}</h1>
          <p className="course-instructor">
            By {course.instructor?.name || "Unknown Instructor"}
          </p>
          <p className="course-description">{course.description}</p>

          {!isEnrolled ? (
            <button
              className="enroll-btn"
              disabled={enrolling}
              onClick={handleEnroll}
            >
              {enrolling ? "Enrolling..." : "Enroll Now"}
            </button>
          ) : (
            <button
              className="unenroll-btn"
              disabled={enrolling}
              onClick={handleUnenroll}
            >
              {enrolling ? "Unenrolling..." : "Unenroll"}
            </button>
          )}
        </div>
      </div>

      {/* LESSONS */}
      <h2 className="lessons-title">Lessons</h2>

      <div className="course-layout">
        <div className="lessons-list">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`lesson-item ${
                selectedLesson?.id === lesson.id ? "active" : ""
              } ${completedLessons.includes(lesson.id) ? "completed" : ""}`}
              onClick={() => setSelectedLesson(lesson)}
            >
              {lesson.title}
              {completedLessons.includes(lesson.id) && " ✔"}
            </div>
          ))}
        </div>

        <div className="lesson-player">
          {isEnrolled ? (
            <>
              <LessonPlayer lesson={selectedLesson} />

              {selectedLesson &&
                !completedLessons.includes(selectedLesson.id) && (
                  <button
                    className="complete-btn"
                    onClick={() => markCompleted(selectedLesson.id)}
                  >
                    Mark as Completed
                  </button>
                )}

              {selectedLesson &&
                completedLessons.includes(selectedLesson.id) && (
                  <Link to={`/lessons/${selectedLesson.id}/quiz`}>
                    <button
                      className="dashboard-btn"
                      style={{ marginTop: "10px" }}
                    >
                      Take Quiz
                    </button>
                  </Link>
                )}
            </>
          ) : (
            <p className="locked-message">
              You must enroll to watch lessons and take quizzes.
            </p>
          )}
        </div>
      </div>

      {/* CERTIFICATE */}
      {isAuthenticated && isEnrolled && courseCompleted && (
        <div style={{ marginTop: "30px" }}>
          <button
            className="complete-btn"
            disabled={certificateLoading}
            onClick={generateCertificate}
          >
            {certificateLoading
              ? "Generating Certificate..."
              : "Generate Certificate"}
          </button>
        </div>
      )}
    </div>
  );
}
