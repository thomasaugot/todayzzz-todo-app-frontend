import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { Todo } from "../models/Todo";
import {
  fetchTodosFromBackend,
  addTodoToBackend,
  updateTodoInBackend,
  deleteTodoFromBackend,
} from "../services/todoService";
import { v4 as uuidv4 } from "uuid";

export interface TodoContextType {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (todoText: string) => Promise<void>;
  todoList: Todo[];
  completedTodos: Todo[];
  onDragEnd: (result: any) => void;
  updateTodo: (updatedTodo: Todo) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const fetchTodos = useCallback(async () => {
    try {
      const todos = await fetchTodosFromBackend();
      const activeTodos = todos.filter((todo) => !todo.isDone);
      const doneTodos = todos.filter((todo) => todo.isDone);
      setTodoList(activeTodos);
      setCompletedTodos(doneTodos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }, []);

  useEffect(() => {
    fetchTodos();
    console.log("my todos ---> ", todo);
  }, [fetchTodos]);

  const addTodo = async (todoText: string) => {
    if (todoText.trim() === "") return;
    try {
      await addTodoToBackend({
        id: uuidv4(),
        content: todoText,
        isDone: false,
      });
      await fetchTodos();
      setTodo("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (updatedTodo: Todo) => {
    try {
      await updateTodoInBackend(updatedTodo);
      await fetchTodos();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await deleteTodoFromBackend(id);
      await fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const activeTodos = [...todoList];
    const completed = [...completedTodos];

    if (source.droppableId === "TodoList") {
      const [removed] = activeTodos.splice(source.index, 1);
      completed.splice(destination.index, 0, removed);
      updateTodo({ ...removed, isDone: true });
    } else {
      const [removed] = completed.splice(source.index, 1);
      activeTodos.splice(destination.index, 0, removed);
      updateTodo({ ...removed, isDone: false });
    }

    setTodoList(activeTodos);
    setCompletedTodos(completed);
  };

  return (
    <TodoContext.Provider
      value={{
        todo,
        setTodo,
        handleSubmit: addTodo,
        todoList,
        completedTodos,
        onDragEnd,
        updateTodo,
        deleteTodo,
        setTodoList,
        setCompletedTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};
