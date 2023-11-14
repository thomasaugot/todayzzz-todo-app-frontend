import React, { useRef, useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./TodoElement.scss";
import { Todo } from "../../context/TodosContext";

const TodoElement: React.FC<{
  index: number;
  todo: Todo;
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}> = ({ index, todo, todoList, setTodoList }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.content);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodoList(todoList.map((t) => (t.id === id ? { ...t, content: editTodo } : t)));
    setEdit(false);
  };

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setTodoList(todoList.filter((t) => t.id !== id));
  };

  const handleDone = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setTodoList(todoList.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t)));
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
            <span
              className="todo__element__text"
              onClick={() => {
                if (!edit && !todo.isDone) {
                  setEdit(!edit);
                }
              }}
            >
              {todo.content}
            </span>
          )}
          <div>
            <span className="iconTodos" onClick={(e) => handleEdit(e, todo.id)}>
              <AiFillEdit />
            </span>
            <span className="iconTodos" onClick={(e) => handleDelete(todo.id, e)}>
              <AiFillDelete />
            </span>
            <span className="iconTodos" onClick={(e) => handleDone(todo.id, e)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoElement;
