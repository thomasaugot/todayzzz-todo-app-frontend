import React from "react";
import "./InputField.scss";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
  mode: "dark" | "light";
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleSubmit }) => {
  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);

    setTodo("");
  };

  return (
    <form className="input" onSubmit={handleLocalSubmit} id="input-field">
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
