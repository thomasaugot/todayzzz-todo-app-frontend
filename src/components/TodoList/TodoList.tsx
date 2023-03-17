import React from "react";
import { Todo } from "../../model";
import TodoElement from "../TodoElement/TodoElement";

interface Props {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todoList, setTodoList }) => {
  return (
    <div className="TodoList">
      {todoList.map((todo) => (
        <TodoElement todo={todo} key={todo.id} todoList={todoList} setTodoList={setTodoList} />
      ))}
    </div>
  );
};

export default TodoList;
