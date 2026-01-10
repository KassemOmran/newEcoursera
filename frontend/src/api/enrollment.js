import axiosClient from "./axiosclient";

export async function enroll(courseId) {
  return await axiosClient.post(`/enroll/${courseId}`);
}

export async function unenroll(courseId) {
  return await axiosClient.delete(`/enroll/${courseId}`);
}

export async function myCourses() {
  return await axiosClient.get("/my-courses");
}
