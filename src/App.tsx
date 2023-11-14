import React, { useState, useEffect } from "react";
import { Todo } from "./model";
import "./styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppContent from "./components/AppContent/AppContent";
import { DropResult } from "react-beautiful-dnd";
import { DarkModeProvider } from "./context/DarkmodeContext";
import { TodosProvider } from "./context/TodosContext";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Array<Todo>>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);
  const [mode] = useState<"dark" | "light">(
    localStorage.getItem("mode") === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark-mode", mode === "dark");
    root.classList.toggle("light-mode", mode === "light");
  }, [mode]);

  // Handles adding todos
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodoList([...todoList, { id: Date.now(), content: todo, isDone: false }]);
      setTodo("");
    }
  };

  // Handles moving todos to the finished zone
  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    } else if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todoList.slice();
    let complete = CompletedTodos.slice();

    // Send completed items back to active tasks
    if (source.droppableId === "TodoList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Move to completed tasks
    if (destination.droppableId === "TodoList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodoList(active);
  };

  return (
    <Router>
      <DarkModeProvider>
        <TodosProvider>
          <Routes>
            <Route
              path="/"
              element={
                <AppContent
                  todo={todo}
                  setTodo={setTodo}
                  handleSubmit={handleSubmit}
                  todoList={todoList}
                  setTodoList={setTodoList}
                  completedTodos={CompletedTodos}
                  onDragEnd={onDragEnd}
                  setCompletedTodos={setCompletedTodos}
                />
              }
            />
          </Routes>
        </TodosProvider>
      </DarkModeProvider>
    </Router>
  );
};

export default App;
