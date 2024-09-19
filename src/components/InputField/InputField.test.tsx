import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "./InputField";

describe("InputField component", () => {
  let setTodoMock: jest.Mock;
  let handleSubmitMock: jest.Mock;

  beforeEach(() => {
    setTodoMock = jest.fn();
    handleSubmitMock = jest.fn();
  });

  it("renders the InputField component correctly", () => {
    render(
      <InputField
        todo=""
        setTodo={setTodoMock}
        handleSubmit={handleSubmitMock}
        mode="light"
      />
    );

    // Check if the input field is rendered
    const inputField = screen.getByRole("textbox");
    expect(inputField).toBeInTheDocument();

    // Check if the submit button is rendered
    const submitButton = screen.getByRole("button", { name: /go/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("updates the input value when typing", () => {
    render(
      <InputField
        todo=""
        setTodo={setTodoMock}
        handleSubmit={handleSubmitMock}
        mode="light"
      />
    );

    // Simulate typing in the input field
    const inputField = screen.getByRole("textbox");
    fireEvent.change(inputField, { target: { value: "New task" } });

    // Assert that the setTodo function is called with the new value
    expect(setTodoMock).toHaveBeenCalledWith("New task");
  });

  it("calls handleSubmit on form submit", () => {
    render(
      <InputField
        todo="Test task"
        setTodo={setTodoMock}
        handleSubmit={handleSubmitMock}
        mode="light"
      />
    );

    // Simulate form submission
    const formElement = screen.getByTestId("input-field");
    fireEvent.submit(formElement);

    // Assert that handleSubmit function is called
    expect(handleSubmitMock).toHaveBeenCalled();
  });

  it("displays the correct initial value in the input field", () => {
    render(
      <InputField
        todo="Initial task"
        setTodo={setTodoMock}
        handleSubmit={handleSubmitMock}
        mode="light"
      />
    );

    // Check if the input field displays the correct value
    const inputField = screen.getByRole("textbox");
    expect(inputField).toHaveValue("Initial task");
  });
});
