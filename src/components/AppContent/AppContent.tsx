import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Flip from "react-awesome-reveal";
import Sidebar from "../Sidebar/Sidebar";
import InputField from "../InputField/InputField";
import TodoList from "../TodoList/TodoList";
import { Todo } from "../../model";
import { useDarkMode } from "../../context/DarkmodeContext";
import { useMediaQuery } from "react-responsive";
import MobileMenu from "../MobileMenu/MobileMenu";
import "./AppContent.scss";

interface AppContentProps {
  todo: string;
  setTodo: any;
  handleSubmit: (e: React.FormEvent) => void;
  todoList: Todo[];
  setTodoList: any;
  completedTodos: Todo[];
  setCompletedTodos: any;
  onDragEnd: (result: DropResult) => void;
}

const AppContent: React.FC<AppContentProps> = ({
  todo,
  setTodo,
  handleSubmit,
  todoList,
  setTodoList,
  completedTodos,
  setCompletedTodos,
  onDragEnd,
}) => {
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
        />
      </div>
    </DragDropContext>
  );
};

export default AppContent;
