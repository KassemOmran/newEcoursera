import axiosClient from "./axiosclient";

export async function getAllCourses() {
  return await axiosClient.get("/courses");
}

export async function getCourse(id) {
  return await axiosClient.get(`/courses/${id}`);
}

export async function createCourse(courseData) {
  return await axiosClient.post("/instructor/courses", courseData);
}

export async function updateCourse(id, data) {
  return await axiosClient.put(`/instructor/courses/${id}`, data);
}

export async function deleteCourse(id) {
  return await axiosClient.delete(`/instructor/courses/${id}`);
}

export async function getInstructorCourses() {
  return await axiosClient.get("/instructor/courses");
}

export async function createLesson(courseId, lessonData) {
  return await axiosClient.post(`/courses/${courseId}/lessons`, lessonData);
}

export async function updateLesson(courseId, lessonId, data) {
  return await axiosClient.put(`/courses/${courseId}/lessons/${lessonId}`, data);
}

export async function deleteLesson(courseId, lessonId) {
  return await axiosClient.delete(`/courses/${courseId}/lessons/${lessonId}`);
}
