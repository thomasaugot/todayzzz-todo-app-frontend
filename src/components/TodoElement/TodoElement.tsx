import { Todo } from "../../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./TodoElement.scss";
import { useRef } from "react";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

const TodoElement: React.FC<{
  index: number;
  todo: Todo;
  todoList: Array<Todo>;
  setTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}> = ({ index, todo, todoList, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.content);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(todoList.map((todo) => (todo.id === id ? { ...todo, content: editTodo } : todo)));
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTodos(todoList.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(todoList.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          onSubmit={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={`todo__element ${snapshot.isDragging ? "drag" : ""}`}
        >
          {edit ? (
            <input
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todo__element__text"
              ref={inputRef}
            />
          ) : todo.isDone ? (
            <s className="todo__element__text">{todo.content}</s>
          ) : (
            <span className="todo__element__text">{todo.content}</span>
          )}
          <div>
            <span
              className="iconTodos"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              <AiFillEdit />
            </span>
            <span className="iconTodos" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="iconTodos" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoElement;
