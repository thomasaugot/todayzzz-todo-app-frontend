import React, { createContext, useReducer, useContext, useEffect, ReactNode } from "react";
import axios from "axios";

export interface User {
  user_id: number;
  firstname: string;
  lastname: string;
  collections: [];
  todo_items: [string];
}

export interface Collection {
  collection_id: number;
  name: string;
  todo_items: [string];
  user_id: number;
}

export interface Todo {
  id: number;
  todo_item_id: number;
  content: string;
  user_id: number;
  collection_id: number;
  isDone: boolean;
}

// overall state of the app
export interface TodosState {
  completedTodos: any;
  user: User | null;
  collections: Collection[];
  todos: Todo[];
}

//Describes the possible actions that can be dispatched to the reducer
type Action =
  | { type: "SET_USER"; payload: User }
  | { type: "FETCH_COLLECTIONS"; payload: Collection[] }
  | { type: "FETCH_TODOS"; payload: Todo[] }
  | { type: "SET_SELECTED_COLLECTION"; payload: Collection }
  | { type: "SET_SELECTED_COLLECTION"; payload: null };

interface TodosContextProps {
  state: TodosState;
  dispatch: React.Dispatch<Action>;
}

const TodosContext = createContext<TodosContextProps | undefined>(undefined);

// creating a custom hook to access the context within components
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

const todosReducer = (state: TodosState, action: Action): TodosState => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "FETCH_COLLECTIONS":
      return {
        ...state,
        collections: action.payload,
      };
    case "FETCH_TODOS":
      return {
        ...state,
        todos: action.payload,
      };
    default:
      return state;
  }
};

const initialState: TodosState = {
  user: null,
  collections: [],
  todos: [],
  completedTodos: undefined,
};

// provider component that wraps the app, managing the global state.
const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  // fetch data from the server when the component mounts.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get<User>("/api/user");
        dispatch({ type: "SET_USER", payload: userResponse.data });

        const collectionsResponse = await axios.get<Collection[]>("/api/collections");
        dispatch({ type: "FETCH_COLLECTIONS", payload: collectionsResponse.data });

        const todosResponse = await axios.get<Todo[]>("/api/todos");
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
