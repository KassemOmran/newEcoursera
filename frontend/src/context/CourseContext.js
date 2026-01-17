import { createContext, useState, useEffect } from "react";
import * as courseAPI from "../api/courses";

export const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
  const [categories] = useState([
    "Programming",
    "Design",
    "Business",
    "Marketing",
    "IT & Software",
  ]);

  // Example: load all courses on first mount
  useEffect(() => {
    fetchAllCourses();
  }, []);

  async function fetchAllCourses() {
    try {
      const data = await courseAPI.getAllCourses();
    console.log("API response:", data); // debug
    setCourses(Array.isArray(data) ? data : data.courses || []);
    } catch (err) {
      console.error("Error loading courses", err);
      setCourses([]);
    }
  }

  function getCourseById(id) {
    return courses.find((c) => String(c.id) === String(id));
  }

  const value = {
    courses,
    categories,
    fetchAllCourses,
    getCourseById,
  };

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
}
