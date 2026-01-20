import { createContext, useEffect, useState } from "react";
import { getProfile, logout as logoutApi } from "../api/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Restore user on app load (if token exists)
   */
  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("ecourse_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const profile = await getProfile();
        setUser(profile);
      } catch (err) {
        console.error("Auth restore failed", err);
        localStorage.removeItem("ecourse_token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  /**
   * Login user (called after register/login)
   */
  function login(userData) {
    setUser(userData);
  }

  /**
   * Logout user
   */
  async function logout() {
    try {
      await logoutApi();
    } catch (e) {
      // ignore backend logout errors
    } finally {
      localStorage.removeItem("ecourse_token");
      setUser(null);
    }
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
