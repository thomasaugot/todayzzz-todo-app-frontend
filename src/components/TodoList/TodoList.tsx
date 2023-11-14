import React, { useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import TodoElement from "../TodoElement/TodoElement";
import "./TodoList.scss";
import { Todo, useTodosContext } from "../../context/TodosContext";

interface Props {
  todoList: Todo[];
  completedTodos: Todo[];
  setTodoList: any;
  setCompletedTodos: any;
}

const TodoList: React.FC<Props> = ({ setTodoList, setCompletedTodos }) => {
  const { state } = useTodosContext(); // Access the state from the context

  useEffect(() => {
    // just for cleanup
    return () => {};
  }, [setTodoList]);

  return (
    <div className="columns-container" id="todo-list">
      <Droppable droppableId="TodoList">
        {(provided, snapshot) => (
          <div
            className={`todos__column ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__title">Active Tasks</span>
            {state.todos?.map((todo, index) => (
              <TodoElement
                index={index}
                todoList={state.todos}
                todo={todo}
                key={todo.id}
                setTodoList={setTodoList}
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
            {state.completedTodos?.map((todo: Todo, index: number) => (
              <TodoElement
                index={index}
                todoList={state.completedTodos as any}
                todo={todo}
                key={todo.id}
                setTodoList={setCompletedTodos}
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
