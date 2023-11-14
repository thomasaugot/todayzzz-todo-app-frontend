import React, { useState } from "react";
import "./Sidebar.scss";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { Modal } from "react-responsive-modal";
import LoginForm from "../LoginSingup/LoginSignup";
import "react-responsive-modal/styles.css";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useTodosContext } from "../../context/TodosContext";
import { Collection } from "../../context/TodosContext"; // Import Collection type
import "../../styles/variables.scss";

const Sidebar: React.FC = () => {
  const { dispatch: todosDispatch, state } = useTodosContext();
  const [isOpen, setIsOpen] = useState(false);
  const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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

  const openCollection = (collection: Collection) => {
    todosDispatch({ type: "SET_SELECTED_COLLECTION", payload: collection });
    toggleSidebar(); // Close the sidebar when a collection is selected
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
        <button onClick={onOpenLoginModal}>Login / Signup</button>
        {state.user &&
          state.collections.map((collection) => (
            <button key={collection.collection_id} onClick={() => openCollection(collection)}>
              {collection.name}
            </button>
          ))}
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
