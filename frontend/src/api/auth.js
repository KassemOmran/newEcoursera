import axiosClient from "./axiosclient";

export async function login(email, password) {
  return await axiosClient.post("/login", { email, password });
}

export async function register(data) {
  return await axiosClient.post("/register", data);
}

export async function logout() {
  return await axiosClient.post("/logout");
}

export async function getProfile() {
  return await axiosClient.get("/profile");
}
