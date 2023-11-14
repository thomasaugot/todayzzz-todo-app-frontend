import React, { useState, useEffect } from "react";
import "./styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppContent from "./components/AppContent/AppContent";
import { DropResult } from "react-beautiful-dnd";
import { DarkModeProvider } from "./context/DarkmodeContext";
import { Todo, useTodosContext } from "./context/TodosContext";

const App: React.FC = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [mode] = useState<"dark" | "light">(
    localStorage.getItem("mode") === "dark" ? "dark" : "light"
  );
  const { state } = useTodosContext(); // Use useTodosContext hook to access the context state
  const { user, selectedCollection } = state;

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark-mode", mode === "dark");
    root.classList.toggle("light-mode", mode === "light");
  }, [mode]);

  // Handles adding todos
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo && user && selectedCollection !== null) {
      const newTodo: Todo = {
        todo_item_id: Date.now(),
        user_id: user.user_id,
        collection_id: selectedCollection.collection_id,
        id: Date.now(),
        content: todo,
        isDone: false,
      };

      setTodoList([...todoList, newTodo]);
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
      </DarkModeProvider>
    </Router>
  );
};

export default App;
