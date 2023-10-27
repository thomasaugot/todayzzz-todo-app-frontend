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
});
