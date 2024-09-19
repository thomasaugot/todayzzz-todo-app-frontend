import { render, screen, fireEvent } from "@testing-library/react";
import TodoElement from "./TodoElement";
import { Todo } from "../../model";
import { Draggable } from "react-beautiful-dnd";

// Mocking Draggable
jest.mock("react-beautiful-dnd", () => ({
  Draggable: jest.fn(({ children }) =>
    children(
      { draggableProps: {}, dragHandleProps: {}, innerRef: jest.fn() },
      { isDragging: false }
    )
  ),
}));

describe("TodoElement component", () => {
  const mockSetTodos = jest.fn();
  const todo: Todo = { id: 1, content: "Test Todo", isDone: false };
  const todoList: Array<Todo> = [todo];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the TodoElement component correctly", () => {
    render(
      <TodoElement
        index={0}
        todo={todo}
        todoList={todoList}
        setTodos={mockSetTodos}
      />
    );

    // Check that the todo content is displayed
    expect(screen.getByText(/test todo/i)).toBeInTheDocument();

    // Check that the edit, delete, and done icons are displayed
    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /done/i })).toBeInTheDocument();
  });

  it("calls setTodos to mark a todo as done when the 'done' icon is clicked", () => {
    render(
      <TodoElement
        index={0}
        todo={todo}
        todoList={todoList}
        setTodos={mockSetTodos}
      />
    );

    // Find and click the 'done' icon
    const doneIcon = screen.getByRole("button", { name: /done/i });
    fireEvent.click(doneIcon);

    // Verify that setTodos is called with the updated todo list
    expect(mockSetTodos).toHaveBeenCalledWith([{ ...todo, isDone: true }]);
  });

  it("calls setTodos to delete a todo when the 'delete' icon is clicked", () => {
    render(
      <TodoElement
        index={0}
        todo={todo}
        todoList={todoList}
        setTodos={mockSetTodos}
      />
    );

    // Find and click the 'delete' icon
    const deleteIcon = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteIcon);

    // Verify that setTodos is called with the updated todo list without the deleted item
    expect(mockSetTodos).toHaveBeenCalledWith([]);
  });

  it("enables editing the todo when the 'edit' icon is clicked", () => {
    render(
      <TodoElement
        index={0}
        todo={todo}
        todoList={todoList}
        setTodos={mockSetTodos}
      />
    );

    // Find and click the 'edit' icon
    const editIcon = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editIcon);

    // Check if the input for editing is shown and contains the todo content
    const editInput = screen.getByDisplayValue("Test Todo");
    expect(editInput).toBeInTheDocument();

    // Change the value of the input
    fireEvent.change(editInput, { target: { value: "Updated Todo" } });

    // Simulate submitting the form
    fireEvent.submit(editInput);

    // Verify that setTodos is called with the updated todo content
    expect(mockSetTodos).toHaveBeenCalledWith([
      { ...todo, content: "Updated Todo" },
    ]);
  });

  it("focuses on the input when editing a todo", () => {
    render(
      <TodoElement
        index={0}
        todo={todo}
        todoList={todoList}
        setTodos={mockSetTodos}
      />
    );

    // Find and click the 'edit' icon
    const editIcon = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editIcon);

    // Check if the input receives focus
    const editInput = screen.getByDisplayValue("Test Todo");
    expect(editInput).toHaveFocus();
  });

  it("displays a strikethrough when the todo is marked as done", () => {
    const doneTodo = { ...todo, isDone: true };

    render(
      <TodoElement
        index={0}
        todo={doneTodo}
        todoList={[doneTodo]}
        setTodos={mockSetTodos}
      />
    );

    // Check that the content is displayed with a strikethrough
    const doneContent = screen.getByText(/test todo/i);
    expect(doneContent).toHaveClass("todo__element__text");
    expect(doneContent.tagName).toBe("S");
  });
});
