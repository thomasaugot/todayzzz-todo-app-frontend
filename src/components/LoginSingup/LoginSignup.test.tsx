import { render, screen } from "@testing-library/react";
import LoginSignup from "./LoginSignup";

jest.mock("./AuthForm", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="mocked-auth-form"></div>,
  };
});

describe("LoginSignup component", () => {
  it("should render the component correctly", () => {
    render(<LoginSignup />);

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Not a member yet? Sign up!")).toBeInTheDocument();
  });
});
