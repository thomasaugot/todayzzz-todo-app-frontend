import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InputField from "./InputField";
import { TodosProvider } from "../../context/TodosContext";

describe("InputField component", () => {
  it("should render the component correctly", () => {
    const mockProps = {
      todo: "",
      setTodo: jest.fn(),
      handleSubmit: jest.fn(),
      mode: "dark" as "dark" | "light",
    };

    render(
      <TodosProvider>
        <InputField {...mockProps} />
      </TodosProvider>
    );

    expect(screen.getByLabelText("Add a task")).toBeInTheDocument();
    expect(screen.getByTestId("input-field")).toBeInTheDocument();
  });

  it("should update the input value correctly", () => {
    const mockProps = {
      todo: "",
      setTodo: jest.fn(),
      handleSubmit: jest.fn(),
      mode: "dark" as "dark" | "light",
    };
    render(
      <TodosProvider>
        <InputField {...mockProps} />
      </TodosProvider>
    );

    const inputElement = screen.getByLabelText("Add a task");

    userEvent.type(inputElement, "New Task");

    expect(inputElement).toHaveValue("New Task");
  });

  it("should call handleSubmit on form submit", () => {
    const mockProps = {
      todo: "",
      setTodo: jest.fn(),
      handleSubmit: jest.fn(),
      mode: "dark" as "dark" | "light",
    };

    render(
      <TodosProvider>
        <InputField {...mockProps} />
      </TodosProvider>
    );

    const formElement = screen.getByTestId("input-field");

    fireEvent.submit(formElement);

    expect(mockProps.handleSubmit).toHaveBeenCalled();
  });
});
