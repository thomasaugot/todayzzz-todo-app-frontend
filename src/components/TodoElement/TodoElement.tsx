import React, { useState, useRef } from "react";
import { Todo } from "../../models/Todo";
import "./TodoElement.scss";

interface TodoElementProps {
  todo: Todo;
  index: number;
  setTodos: (updatedTodo: Todo) => Promise<void>;
}

const TodoElement: React.FC<TodoElementProps> = ({ todo, index, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.content);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEditToggle = () => {
    setEdit(!edit);
    if (!edit) {
      setEditTodo(todo.content);
      inputRef.current?.focus();
    } else {
      const updatedTodo = { ...todo, content: editTodo };
      setTodos(updatedTodo);
    }
  };

  return (
    <div className="todo__element">
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
        />
      ) : todo.isDone ? (
        <s className="todo__element__text">{todo.content}</s>
      ) : (
        <span className="todo__element__text">{todo.content}</span>
      )}
      <div>
        <button onClick={handleEditToggle}>{edit ? "Save" : "Edit"}</button>
      </div>
    </div>
  );
};

export default TodoElement;
