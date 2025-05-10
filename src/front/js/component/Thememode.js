import React, { useState, useEffect } from "react"; // Importa React

export function Thememode() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.classList.toggle("dark-mode", theme === "dark");
    document.body.classList.toggle("light-mode", theme === "light");

    
    localStorage.setItem("theme", theme);
  }, [theme]);

 
  const changetheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button className="btn btn-outline-dark mx-3 border border-0" onClick={changetheme}>
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}
