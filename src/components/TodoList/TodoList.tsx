import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../../model";
import TodoElement from "../TodoElement/TodoElement";
import "./TodoList.scss";

interface props {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
  CompletedTodos: Array<Todo>;
}

const TodoList: React.FC<props> = ({
  todoList,
  setTodoList,
  CompletedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="columns-container">
      <Droppable droppableId="TodoList">
        {(provided, snapshot) => (
          <div
            className={`todos__column ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__title">Active Tasks</span>
            {todoList?.map((todo, index) => (
              <TodoElement
                index={index}
                todoList={todoList}
                todo={todo}
                key={todo.id}
                setTodos={setTodoList}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodoFinished">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`todos__column  ${snapshot.isDraggingOver ? "dragcomplete" : "remove"}`}
          >
            <span className="todos__title">Completed Tasks</span>
            {CompletedTodos?.map((todo, index) => (
              <TodoElement
                index={index}
                todoList={CompletedTodos}
                todo={todo}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
