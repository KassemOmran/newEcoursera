import axiosClient from "./axiosclient";

/**
 * Login user
 * @param {string} email
 * @param {string} password
 */
export function login(email, password) {
  return axiosClient.post("/login", {
    email,
    password,
  });
}

/**
 * Register user
 * data must include:
 * - name
 * - email
 * - password
 * - password_confirmation
 */
export function register(data) {
  return axiosClient.post("/register", data);
}

/**
 * Logout current user
 */
export function logout() {
  return axiosClient.post("/logout");
}

/**
 * Get authenticated user profile
 */
export function getProfile() {
  return axiosClient.get("/me");
}
