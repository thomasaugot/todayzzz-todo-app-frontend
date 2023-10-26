import React from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import "./DarkModeToggle.scss";

interface DarkModeToggleProps {
  mode: "dark" | "light";
  setMode: (mode: "dark" | "light") => void;
}

const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ mode, setMode }) => {
  const toggleMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
  };

  return (
    <div className="toggle-container">
      <label className="toggle">
        <input type="checkbox" onClick={toggleMode} />
        <span className="slider round">
          {mode === "light" ? (
            <MdOutlineDarkMode className="icon" />
          ) : (
            <MdOutlineLightMode className="icon" />
          )}
        </span>
      </label>
    </div>
  );
};

export default DarkModeToggle;
