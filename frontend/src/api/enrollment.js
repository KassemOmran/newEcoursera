import axiosClient from "./axiosclient";

export async function enroll(courseId) {
  return await axiosClient.post(`/courses/${courseId}/enroll`);
}

export async function unenroll(courseId) {
  return await axiosClient.post(`/courses/${courseId}/enroll`);
}

export async function myCourses() {
  return await axiosClient.get("/my-courses");
}
