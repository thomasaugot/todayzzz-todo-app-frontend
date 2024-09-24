import React from "react";
import { render } from "@testing-library/react";
import TodoElement from "./TodoElement";
import { Todo } from "../../models/Todo";

describe("TodoElement component", () => {
  const mockSetTodos = jest.fn();
  const todo: Todo = { id: "1", content: "Test Todo", isDone: false };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the todo element correctly", () => {
    const { getByText } = render(
      <TodoElement index={0} todo={todo} setTodos={mockSetTodos} />
    );
    expect(getByText("Test Todo")).toBeInTheDocument();
  });
});
