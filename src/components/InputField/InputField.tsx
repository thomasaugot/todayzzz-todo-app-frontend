import React from "react";
import "./InputField.scss";

// I create the interface so that I can define the type of my props on line 9
interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>; // I get the type of setTodo when hovering it in App.tsx line 6
  handleSubmit: (e: React.FormEvent) => void;
  mode: "dark" | "light";
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleSubmit }) => {
  return (
    <form className="input" onSubmit={handleSubmit} id="input-field">
      <input
        type="text"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
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
