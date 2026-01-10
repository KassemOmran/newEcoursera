import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("ecourse_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  function login(userData) {
    setUser(userData);
    localStorage.setItem("ecourse_user", JSON.stringify(userData));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("ecourse_user");
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
