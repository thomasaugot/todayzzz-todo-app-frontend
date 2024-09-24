import api from "./api";
import { Todo } from "../models/Todo";

// Fetch all todos from backend
export const fetchTodosFromBackend = async (): Promise<Todo[]> => {
  try {
    const response = await api.get("/todos");
    console.log("my todos ---> ", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

// Add a new todo
export const addTodoToBackend = async (todo: Todo): Promise<Todo> => {
  try {
    const response = await api.post("/todos", todo);
    // console.log("new todo added ---> ", todo);
    return response.data;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

// Update an existing todo
export const updateTodoInBackend = async (todo: Todo): Promise<Todo> => {
  try {
    const response = await api.put(`/todos/${todo.id}`, todo);
    return response.data;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

// Delete a todo
export const deleteTodoFromBackend = async (id: number): Promise<void> => {
  try {
    await api.delete(`/todos/${id}`);
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};
