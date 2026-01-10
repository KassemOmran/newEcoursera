import React, { useEffect, useState } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }
  return (
    <div className={`app app-${theme}`}>
      <AppRoutes theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}

export default App;
