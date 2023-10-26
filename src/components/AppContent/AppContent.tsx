import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Flip from "react-awesome-reveal";
import Sidebar from "../Sidebar/Sidebar";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import InputField from "../InputField/InputField";
import TodoList from "../TodoList/TodoList";
import { Todo } from "../../model";
import { useDarkMode } from "../../context/DarkmodeContext";
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={`App ${mode === "dark" ? "dark-mode" : "light-mode"}`}>
        <Sidebar />
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className="title-container">
            <Flip triggerOnce={false}>
              <h1>Todayzzz</h1>
            </Flip>
          </div>
          <DarkModeToggle /> {/* Remove mode and setMode props here */}
        </div>

        <InputField todo={todo} setTodo={setTodo} handleSubmit={handleSubmit} mode={mode} />
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
