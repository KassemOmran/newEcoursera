import axiosClient from "./axiosclient";

export async function getCertificates() {
  return await axiosClient.get("/certificates");
}

export async function generateCertificate(courseId) {
  return await axiosClient.post(`/certificates/${courseId}`);
}
