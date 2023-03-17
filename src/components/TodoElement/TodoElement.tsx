import React, { useState } from "react";
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
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.content);

  const handleDone = (id: number) => {
    setTodoList(
      todoList.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo))
    );
  };

  const handleDelete = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodoList(todoList.map((todo) => (todo.id === id ? { ...todo, content: editTodo } : todo)));
    setEdit(false);
  };

  return (
    <div>
      <form className="todo__element" onSubmit={(e) => handleEdit(e, todo.id)}>
        {edit ? (
          <input value={editTodo} onChange={(e) => setEditTodo(e.target.value)} />
        ) : todo.isDone ? (
          <s className="todo__element__text">{todo.content}</s>
        ) : (
          <span className="todo__element__text">{todo.content}</span>
        )}
        <div>
          <span className="icon">
            <AiFillEdit
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            />
          </span>
          <span className="icon">
            <AiFillDelete onClick={() => handleDelete(todo.id)} />
          </span>
          <span className="icon">
            <MdDone onClick={() => handleDone(todo.id)} />
          </span>
        </div>
      </form>
    </div>
  );
};

export default TodoElement;
