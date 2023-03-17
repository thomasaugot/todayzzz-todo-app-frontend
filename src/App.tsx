import React, { useState, useEffect } from "react";
import InputField from "./components/InputField/InputField";
import TodoList from "./components/TodoList/TodoList";
import { Todo } from "./model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Flip } from "react-awesome-reveal";
import "./styles/App.scss";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Array<Todo>>([]);
  const [CompletedTodos, setCompletedTodos] = useState<Array<Todo>>([]);
  const [mode, setMode] = useState<"dark" | "light">(
    localStorage.getItem("mode") === "dark" ? "dark" : "light"
  );

  // toggle the mode
  const toggleMode = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("mode", newMode);
  };

  // set the background color and text color based on the mode
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark-mode", mode === "dark");
    root.classList.toggle("light-mode", mode === "light");
  }, [mode]);

  //Handles adding todos
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodoList([...todoList, { id: Date.now(), content: todo, isDone: false }]);
      setTodo("");
    }
  };

  //Handles moving todos to finished zone
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
    let active = todoList;
    let complete = CompletedTodos;

    // Send completed back to active tasks
    if (source.droppableId === "TodoList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Sent to completed tasks
    if (destination.droppableId === "TodoList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodoList(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <Flip triggerOnce={false}>
          <h1>Todayzzz</h1>
        </Flip>
        <button onClick={toggleMode}>Toggle Mode</button>

        <InputField todo={todo} setTodo={setTodo} handleSubmit={handleSubmit} />
        <TodoList
          todoList={todoList}
          setTodoList={setTodoList}
          CompletedTodos={CompletedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
