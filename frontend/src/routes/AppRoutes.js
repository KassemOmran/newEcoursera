import React from "react";
import { Routes, Route } from "react-router-dom";
import "./AppRoutes.css";

import HomePage from "../pages/HomePage";
import ExploreCourses from "../pages/ExploreCourses";
import CourseView from "../pages/CourseView";
import MyCourses from "../pages/MyCourses";
import CreateCourse from "../pages/CreateCourse";
import CertificatesPage from "../pages/CertificatesPage";
import ProfilePage from "../pages/ProfilePage";
import QuizPage from "../pages/QuizPage";

import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import ForgotPassword from "../components/auth/ForgotPassword";

import ProtectedRoute from "./ProtectedRoute";

import Head from "../components/common/head";
import Foot from "../components/common/foot";
import Sidebar from "../components/common/sidebar";

import InstructorDashboard from "../pages/InstructorDashboard";
import QuizBuilder from "../components/quiz/QuizBuilder";
import QuizTaker from "../components/quiz/QuizTaker";

function AppRoutes({ theme, toggleTheme }) {
  return (
    <>
      <Head theme={theme} toggleTheme={toggleTheme} />

      <div className="app-layout">
        <Sidebar className="sidebar-wrapper" />

        <main className="main-content">
          <Routes>
            {/* PUBLIC */}
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExploreCourses />} />
            <Route path="/course/:id" element={<CourseView />} />

            {/* AUTH */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/forget-pass" element={<ForgotPassword />} />

            {/* STUDENT */}
            <Route
              path="/my-courses"
              element={
                <ProtectedRoute role="student">
                  <MyCourses />
                </ProtectedRoute>
              }
            />

            <Route
              path="/quiz/:quizId"
              element={
                <ProtectedRoute role="student">
                  <QuizPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/certificates"
              element={
                <ProtectedRoute role="student">
                  <CertificatesPage />
                </ProtectedRoute>
              }
            />

            {/* PROFILE (any logged-in user) */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />

            {/* INSTRUCTOR */}
            <Route
              path="/instructor"
              element={
                <ProtectedRoute role="instructor">
                  <InstructorDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/instructor/create"
              element={
                <ProtectedRoute role="instructor">
                  <CreateCourse />
                </ProtectedRoute>
              }
            />

            <Route
              path="/instructor/lessons/:lessonId/quiz"
              element={
                <ProtectedRoute role="instructor">
                  <QuizBuilder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lessons/:lessonId/quiz"
              element={
                <ProtectedRoute role="student">
                  <QuizTaker />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route
              path="*"
              element={<div className="fade-in">Page Not Found</div>}
            />
          </Routes>
        </main>
      </div>

      <Foot />
    </>
  );
}

export default AppRoutes;
