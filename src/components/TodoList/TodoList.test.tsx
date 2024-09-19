import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import TodoList from "./TodoList";
import { supabase } from "../../services/supabaseClient";
import { Todo } from "../../model";

// Mock the supabase client
jest.mock("../../services/supabaseClient", () => ({
  supabase: {
    from: jest.fn(),
    auth: {
      signInWithPassword: jest.fn(),
    },
    channel: jest.fn(() => ({
      on: jest.fn(),
      subscribe: jest.fn(),
    })),
  },
}));

// Mock data
const mockTodoList: Todo[] = [
  { id: 1, content: "Test Todo 1", isDone: false },
  { id: 2, content: "Test Todo 2", isDone: false },
];
const mockCompletedTodos: Todo[] = [
  { id: 3, content: "Completed Todo", isDone: true },
];

describe("TodoList component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the TodoList component with todos", async () => {
    (supabase.from as jest.Mock).mockReturnValueOnce({
      select: jest
        .fn()
        .mockResolvedValueOnce({ data: mockTodoList, error: null }),
    });
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValueOnce({
      data: {},
      error: null,
    });

    render(
      <TodoList
        todoList={mockTodoList}
        setTodoList={jest.fn()}
        completedTodos={mockCompletedTodos}
        setCompletedTodos={jest.fn()}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Active Tasks")).toBeInTheDocument();
      expect(screen.getByText("Completed Tasks")).toBeInTheDocument();
    });

    // Check that TodoElement components are rendered
    expect(screen.getAllByText(/Test Todo/)).toHaveLength(mockTodoList.length);
    expect(screen.getByText("Completed Todo")).toBeInTheDocument();
  });

  it("fetches todos on mount and handles sign in", async () => {
    (supabase.from as jest.Mock).mockReturnValueOnce({
      select: jest
        .fn()
        .mockResolvedValueOnce({ data: mockTodoList, error: null }),
    });
    (supabase.auth.signInWithPassword as jest.Mock).mockResolvedValueOnce({
      data: {},
      error: null,
    });

    render(
      <TodoList
        todoList={mockTodoList}
        setTodoList={jest.fn()}
        completedTodos={mockCompletedTodos}
        setCompletedTodos={jest.fn()}
      />
    );

    await waitFor(() => {
      expect(supabase.from).toHaveBeenCalledWith("todos");
      expect(supabase.auth.signInWithPassword).toHaveBeenCalled();
    });
  });

  it("cleans up the subscription on unmount", () => {
    const unsubscribeMock = jest.fn();
    (supabase.channel as jest.Mock).mockReturnValueOnce({
      on: jest.fn(),
      subscribe: jest
        .fn()
        .mockReturnValueOnce({ unsubscribe: unsubscribeMock }),
    });

    const { unmount } = render(
      <TodoList
        todoList={mockTodoList}
        setTodoList={jest.fn()}
        completedTodos={mockCompletedTodos}
        setCompletedTodos={jest.fn()}
      />
    );

    unmount();
    expect(unsubscribeMock).toHaveBeenCalled();
  });
});
