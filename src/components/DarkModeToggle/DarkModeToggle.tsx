import { useDarkMode } from "../../context/DarkmodeContext";
import "./DarkModeToggle.scss";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";

const Sidebar: React.FC = () => {
  const { mode, setMode } = useDarkMode();

  const toggleMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
  };

  return (
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
  );
};

export default Sidebar;
