import { render, screen, fireEvent } from "@testing-library/react";
import TodoElement from "./TodoElement";

describe("TodoElement component", () => {
  const mockTodo = {
    id: 1,
    todo_item_id: 123,
    content: "Test todo",
    user_id: 456,
    collection_id: 789,
    isDone: false,
  };

  const mockTodoList = [
    {
      id: 1,
      todo_item_id: 123,
      content: "Test todo",
      user_id: 456,
      collection_id: 789,
      isDone: false,
    },
  ];

  const mockSetTodos = jest.fn();

  it("should render the component correctly", () => {
    render(
      <TodoElement index={0} todo={mockTodo} todoList={mockTodoList} setTodoList={mockSetTodos} />
    );

    expect(screen.getByTestId("iconTodos")).toBeInTheDocument();
  });

  it("should handle editing", () => {
    render(
      <TodoElement index={0} todo={mockTodo} todoList={mockTodoList} setTodoList={mockSetTodos} />
    );

    fireEvent.click(screen.getByTestId("edit-todo"));
  });
});
