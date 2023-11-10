import React, { createContext, useReducer, useContext, useEffect, ReactNode } from "react";
import axios from "axios";

interface User {
  user_id: number;
  firstname: string;
  lastname: string;
  collections: [];
  todo_items: [];
}

interface Collection {
  collection_id: number;
  name: string;
  todo_items: [];
  user_id: number;
}

interface TodoItem {
  todo_item_id: number;
  content: string;
  user_id: number;
  collection_id: number;
  isDone: boolean;
}

interface TodosState {
  user: User | null;
  collections: Collection[];
  todos: TodoItem[];
}

type Action =
  | { type: "SET_USER"; payload: User }
  | { type: "FETCH_COLLECTIONS"; payload: Collection[] }
  | { type: "FETCH_TODOS"; payload: TodoItem[] };

interface TodosContextProps {
  state: TodosState;
  dispatch: React.Dispatch<Action>;
}

const TodosContext = createContext<TodosContextProps | undefined>(undefined);

const useTodosContext = (): TodosContextProps => {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodosContext must be used within a TodosProvider");
  }
  return context;
};

interface TodosProviderProps {
  children: ReactNode;
}

const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get<User>("/api/user");
        dispatch({ type: "SET_USER", payload: userResponse.data });

        const collectionsResponse = await axios.get<Collection[]>("/api/collections");
        dispatch({ type: "FETCH_COLLECTIONS", payload: collectionsResponse.data });

        const todosResponse = await axios.get<TodoItem[]>("/api/todos");
        dispatch({ type: "FETCH_TODOS", payload: todosResponse.data });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return <TodosContext.Provider value={{ state, dispatch }}>{children}</TodosContext.Provider>;
};

export { TodosProvider, useTodosContext };
