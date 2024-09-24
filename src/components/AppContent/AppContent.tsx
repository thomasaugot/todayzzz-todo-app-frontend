import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Flip from "react-awesome-reveal";
import Sidebar from "../Sidebar/Sidebar";
import InputField from "../InputField/InputField";
import TodoList from "../TodoList/TodoList";
import { useDarkMode } from "../../context/DarkModeContext";
import { useMediaQuery } from "react-responsive";
import MobileMenu from "../MobileMenu/MobileMenu";
import "./AppContent.scss";
import { useTodoContext } from "../../context/TodoContext";

const AppContent: React.FC = () => {
  const {
    todo,
    setTodo,
    handleSubmit,
    todoList,
    completedTodos,
    onDragEnd,
    updateTodo,
    setTodoList,
    setCompletedTodos,
  } = useTodoContext();
  const { mode } = useDarkMode();
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 768 });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={`App ${mode === "dark" ? "dark-mode" : "light-mode"}`}>
        {isDesktopOrLaptop ? <Sidebar /> : <MobileMenu />}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="title-container">
            <Flip triggerOnce={false}>
              <h1>Todayzzz</h1>
            </Flip>
          </div>
        </div>
        <InputField
          todo={todo}
          setTodo={setTodo}
          handleSubmit={handleSubmit}
          mode={mode}
        />
        <TodoList
          todoList={todoList}
          setTodoList={setTodoList}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
          updateTodo={updateTodo}
        />
      </div>
    </DragDropContext>
  );
};

export default AppContent;
