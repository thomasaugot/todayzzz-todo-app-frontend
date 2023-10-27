import React, { useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "../../model";
import TodoElement from "../TodoElement/TodoElement";
import "./TodoList.scss";
import { supabase } from "../../services/supabaseClient";

interface Props {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
}

const TodoList: React.FC<Props> = ({
  todoList,
  setTodoList,
  completedTodos,
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

    const signIn = async () => {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: "thomas.augot@hotmail.fr",
        password: "wCTuqtkbYbJnHrmPDUGH",
      });
      if (error) {
        console.log("Error signing in:", error);
      } else {
        console.log("Signed in successfully:", data);
        fetchTodos(); // Call the fetchTodos function after signing in
      }
    };

    signIn();

    const todos = supabase
      .channel("custom-all-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "todos" }, (payload) => {
        console.log("Change received!", payload);
      })
      .subscribe();

    // Cleanup function
    return () => {
      todos.unsubscribe(); // Unsubscribe from the channel
    };
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
            {completedTodos?.map((todo, index) => (
              <TodoElement
                index={index}
                todoList={completedTodos}
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
