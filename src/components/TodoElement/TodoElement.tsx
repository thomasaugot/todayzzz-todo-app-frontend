import React from "react";
import { Todo } from "../../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./TodoElement.scss";

interface Props {
  todo: Todo;
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoElement: React.FC<Props> = ({ todo, todoList, setTodoList }) => {
  return (
    <div>
      <form className="todo__element">
        <span className="todo__element__text">{todo.content}</span>
        <div>
          <span className="icon">
            <AiFillEdit />
          </span>
          <span className="icon">
            <AiFillDelete />
          </span>
          <span className="icon">
            <MdDone />
          </span>
        </div>
      </form>
    </div>
  );
};

export default TodoElement;
