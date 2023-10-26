import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../context/DarkmodeContext"; // Adjust the import path
import "./DarkModeToggle.scss";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mode, setMode } = useDarkMode();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="toggle-button" onClick={toggleSidebar}>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
      </div>
      <ul>
        <li>
          <Link to="/collections">Collections</Link>
        </li>
        <li>
          <Link to="/login">Log In</Link>
        </li>
      </ul>
      <div className="dark-mode-toggle">
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
    </div>
  );
};

export default Sidebar;
