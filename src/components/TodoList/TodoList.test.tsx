import { Todo } from "../../models/Todo";

const mockTodoList: Todo[] = [
  { id: "1", content: "Test Todo 1", isDone: false },
  { id: "2", content: "Test Todo 2", isDone: false },
];

const mockCompletedTodos: Todo[] = [
  { id: "3", content: "Completed Todo", isDone: true },
];

const mockSetTodoList = jest.fn();
