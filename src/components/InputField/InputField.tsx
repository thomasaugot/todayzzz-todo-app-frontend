import React from "react";
import "./InputField.scss";
import { addTodoToBackend } from "../../services/todoService";
import { useTodoContext } from "../../context/TodoContext";

interface InputFieldProps {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (todoText: string) => void; // Update type to expect a string
  mode: "dark" | "light";
}

const InputField: React.FC<InputFieldProps> = ({
  todo,
  setTodo,
  handleSubmit,
  mode,
}) => {
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.trim()) {
      handleSubmit(todo);
      // console.log("my todo added ---->", todo);
      setTodo("");
    }
  };

  return (
    <form className="input" onSubmit={onSubmit} id="input-field">
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        required
        className="input__box"
      />
      <label className="input__box__label">Add a task</label>
      <button type="submit" className="input__submit">
        GO
      </button>
    </form>
  );
};

export default InputField;
