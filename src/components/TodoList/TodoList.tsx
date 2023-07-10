import React, { useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../../model";
import TodoElement from "../TodoElement/TodoElement";
import "./TodoList.scss";
import { supabase } from "../../supabaseClient";

interface Props {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  CompletedTodos: Todo[];
}

const TodoList: React.FC<Props> = ({
  todoList,
  setTodoList,
  CompletedTodos,
  setCompletedTodos,
}) => {
  useEffect(() => {
    const fetchTodos = async () => {
      const { data: todos, error } = await supabase.from("todos").select("id, created_at, content");

      if (todos) {
        const formattedTodos = todos.map((todo) => ({
          ...todo,
          isDone: false, // Add the isDone property
        }));
        setTodoList(formattedTodos);
      }
      if (error) {
        console.log("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, [setTodoList]);

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
