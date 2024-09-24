import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TodoElement from "../TodoElement/TodoElement";
import { Todo } from "../../models/Todo";
import "./TodoList.scss";

interface TodoListProps {
  todoList: Todo[];
  completedTodos: Todo[];
  setTodoList: (todos: Todo[]) => void;
  setCompletedTodos: (todos: Todo[]) => void;
  updateTodo: (updatedTodo: Todo) => Promise<void>;
}

const TodoList: React.FC<TodoListProps> = ({
  todoList,
  completedTodos,
  setTodoList,
  setCompletedTodos,
  updateTodo,
}) => {
  return (
    <div className="columns-container" id="todo-list">
      <Droppable droppableId="TodoList">
        {(provided, snapshot) => (
          <div
            className={`todos__column ${
              snapshot.isDraggingOver ? "dragactive" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__title">Active Tasks</span>
            {todoList.length === 0 ? (
              <p className="empty-state">No active tasks</p>
            ) : (
              todoList.map((todo, index) => (
                <TodoElement
                  index={index}
                  todo={todo}
                  key={todo.id}
                  setTodos={updateTodo}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="TodoFinished">
        {(provided, snapshot) => (
          <div
            className={`todos__column ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__title">Completed Tasks</span>
            {completedTodos.length === 0 ? (
              <p className="empty-state">No completed tasks</p>
            ) : (
              completedTodos.map((todo, index) => (
                <TodoElement
                  index={index}
                  todo={todo}
                  key={todo.id}
                  setTodos={updateTodo}
                />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
