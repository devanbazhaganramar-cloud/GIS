import React, { useState } from "react";
import UIButton from "../helpers/ui-components/ui-button";
import { Sun, Moon } from "lucide-react";

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState("lighttheme");

  const toggleTheme = () => {
    const newTheme = theme === "lighttheme" ? "darktheme" : "lighttheme";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <UIButton
      prefix={theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      onClick={toggleTheme}
      className="bg-base-200 text-base-content hover:bg-base-300"
      title="Toggle Theme"
    />
  );
};

export default ThemeToggle;
