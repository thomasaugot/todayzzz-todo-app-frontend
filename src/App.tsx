import React, { useState } from "react";
import InputField from "./components/InputField/InputField";
import TodoList from "./components/TodoList/TodoList";
import { Todo } from "./model";
import "./styles/App.scss";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]); // We import the model Todo to use it as type for the hook

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodoList([...todoList, { id: Date.now(), content: todo, isDone: false }]); // passing the model values
      setTodo("");
    }

    console.log(todoList);
  };

  return (
    <div className="App">
      <h1>Todayzzz</h1>
      <InputField todo={todo} setTodo={setTodo} handleSubmit={handleSubmit} />
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
};

export default App;
