import React, { useState } from "react";
import "./MobileMenu.scss";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { Modal } from "react-responsive-modal";
import LoginForm from "../LoginForm/LoginForm";
import "react-responsive-modal/styles.css";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";

const MobileMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const onOpenLoginModal = () => setLoginModalIsOpen(true);
  const onCloseLoginModal = () => setLoginModalIsOpen(false);

  const closeIcon = (
    <IconContext.Provider value={{ size: "35" }}>
      <AiOutlineClose />
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
    <>
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="menu-toggle" onClick={handleMenuToggle}>
          <span className={`line ${menuOpen ? "open" : ""}`}></span>
          <span className={`line ${menuOpen ? "open" : ""}`}></span>
          <span className={`line ${menuOpen ? "open" : ""}`}></span>
        </div>
        <div className={`menu-content ${menuOpen ? "open" : ""}`}>
          <DarkModeToggle />
          <button onClick={onOpenLoginModal}>Login</button>
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
      </div>
    </>
  );
};

export default MobileMenu;
