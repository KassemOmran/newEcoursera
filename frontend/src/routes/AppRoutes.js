import React from "react";
import { Routes, Route } from "react-router-dom";
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

function AppRoutes({ theme, toggleTheme }) {
  return (
    <>
      <Head theme={theme} toggleTheme={toggleTheme} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExploreCourses />} />
          <Route path="/course/:id" element={<CourseView />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/forget-pass" element={<ForgotPassword />} />
          <Route
            path="/my-courses"
            element={
              <ProtectedRoute>
                <MyCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-course"
            element={
              <ProtectedRoute>
                <CreateCourse />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quiz/:quizId"
            element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/certificates"
            element={
              <ProtectedRoute>
                <CertificatesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div className="fade-in">Page Not Found</div>} />
        </Routes>
      </main>
      <Foot />
    </>
  );
}

export default AppRoutes;
