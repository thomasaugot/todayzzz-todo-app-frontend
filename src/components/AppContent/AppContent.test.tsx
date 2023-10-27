import React from "react";
import AppContent from "./AppContent";
import { render, screen } from "@testing-library/react";

export {};

describe("AppContent component", () => {
  it("should render the component correctly", () => {
    const mockProps = {
      todo: "",
      setTodo: jest.fn(),
      handleSubmit: jest.fn(),
      todoList: [],
      setTodoList: jest.fn(),
      completedTodos: [],
      setCompletedTodos: jest.fn(),
      onDragEnd: jest.fn(),
    };
    render(<AppContent {...mockProps} />);

    expect(screen.getByText("Todayzzz")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("input-field")).toBeInTheDocument();
    expect(screen.getByTestId("todo-list")).toBeInTheDocument();
  });

  it("should call the handleSubmit function on form submit", () => {
    const mockProps = {
      todo: "",
      setTodo: jest.fn(),
      handleSubmit: jest.fn(),
      todoList: [],
      setTodoList: jest.fn(),
      completedTodos: [],
      setCompletedTodos: jest.fn(),
      onDragEnd: jest.fn(),
    };
    render(<AppContent {...mockProps} />);

    const form = screen.getByTestId("todo-input-form");
    form.dispatchEvent(new Event("submit"));

    expect(mockProps.handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("should call the onDragEnd function when a todo is dragged and dropped", () => {
    const mockProps = {
      todo: "",
      setTodo: jest.fn(),
      handleSubmit: jest.fn(),
      todoList: [],
      setTodoList: jest.fn(),
      completedTodos: [],
      setCompletedTodos: jest.fn(),
      onDragEnd: jest.fn(),
    };
    render(<AppContent {...mockProps} />);

    const todo = screen.getByTestId("todo-item");
    todo.dispatchEvent(new Event("dragover"));
    todo.dispatchEvent(new Event("drop"));

    expect(mockProps.onDragEnd).toHaveBeenCalledTimes(1);
  });
});
