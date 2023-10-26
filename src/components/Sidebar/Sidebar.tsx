import React, { useState } from "react";
// import { Link } from "react-router-dom";
import "./Sidebar.scss";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="toggle-button" onClick={toggleSidebar}>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
      </div>
      <div>
        <DarkModeToggle />
      </div>
      {/* <ul>
        <li>
          <Link to="/collections">Collections</Link>
        </li>
        <li>
          <Link to="/login">Log In</Link>
        </li>
      </ul> */}
    </div>
  );
};

export default Sidebar;
