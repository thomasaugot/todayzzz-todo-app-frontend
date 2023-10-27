import React, { useState } from "react";
import "./Sidebar.scss";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { Modal } from "react-responsive-modal";
import LoginForm from "../LoginForm/LoginForm";
import "react-responsive-modal/styles.css";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import "../../styles/variables.scss";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const onOpenLoginModal = () => setLoginModalIsOpen(true);
  const onCloseLoginModal = () => setLoginModalIsOpen(false);

  const closeIcon = (
    <IconContext.Provider value={{ size: "35" }}>
      <AiOutlineClose className="close-icon" />
    </IconContext.Provider>
  );

  const modalStyles = {
    modal: {
      borderRadius: "20px",
      margin: 0,
      padding: 0,
    },
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar">
      <div className="toggle-button" onClick={toggleSidebar}>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
      </div>
      <div>
        <DarkModeToggle />
        <button onClick={onOpenLoginModal}>Login</button>
      </div>
      <Modal
        open={loginModalIsOpen}
        onClose={onCloseLoginModal}
        closeIcon={closeIcon}
        styles={modalStyles}
        center
      >
        <LoginForm />
      </Modal>
    </div>
  );
};

export default Sidebar;
