import React from "react";
import "./InputField.scss";
import { useTodosContext } from "../../context/TodosContext";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
  mode: "dark" | "light";
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleSubmit }) => {
  const { state, dispatch } = useTodosContext();

  const handleLocalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.trim()) {
      dispatch({
        type: "ADD_TODO",
        payload: {
          id: Date.now(),
          todo_item_id: Date.now(), // Add this line
          content: todo,
          user_id: state.user?.user_id || 0, // You might want to adjust this based on your actual user structure
          collection_id: state.selectedCollection?.collection_id || 0, // Adjust this based on your actual collection structure
          isDone: false,
        },
      });
    }

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
