import axiosClient from "./axiosclient";

export async function getAllCourses() {
  return await axiosClient.get("/courses");
}

export async function getCourse(id) {
  return await axiosClient.get(`/courses/${id}`);
}

export async function createCourse(courseData) {
  return await axiosClient.post("/courses", courseData);
}

export async function updateCourse(id, data) {
  return await axiosClient.put(`/courses/${id}`, data);
}

export async function deleteCourse(id) {
  return await axiosClient.delete(`/courses/${id}`);
}
