import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { useDarkMode } from "../../context/DarkModeContext";
import { BrowserRouter as Router } from "react-router-dom"; // To mock Link

// Mocking useDarkMode
jest.mock("../../context/DarkmodeContext", () => ({
  useDarkMode: jest.fn(),
}));

describe("LoginForm component", () => {
  beforeEach(() => {
    (useDarkMode as jest.Mock).mockReturnValue({ mode: "light" });
  });

  it("renders the LoginForm component correctly", () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );

    // Check if username input, password input, and login button are rendered
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();

    // Check if signup link is rendered
    const signupLink = screen.getByRole("link", { name: /sign up/i });
    expect(signupLink).toBeInTheDocument();
  });

  it("updates username and password on change", () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    // Simulate typing in username input
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    expect(usernameInput).toHaveValue("testuser");

    // Simulate typing in password input
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput).toHaveValue("password123");
  });

  it("calls handleLogin with correct values", () => {
    // Mock console.log to verify handleLogin behavior
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    render(
      <Router>
        <LoginForm />
      </Router>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    // Simulate typing in username and password
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    // Simulate clicking the login button
    fireEvent.click(loginButton);

    // Assert that the console.log is called with the correct values
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Logged in with username: testuser and password: password123"
    );

    consoleLogSpy.mockRestore(); // Clean up
  });

  it("renders in light mode by default", () => {
    (useDarkMode as jest.Mock).mockReturnValue({ mode: "light" });

    render(
      <Router>
        <LoginForm />
      </Router>
    );

    // Check if the LoginForm component has the light-mode class
    const loginForm = screen
      .getByRole("heading", { name: /login/i })
      .closest("div");
    expect(loginForm).toHaveClass("light-mode");
  });

  it("renders in dark mode when set", () => {
    (useDarkMode as jest.Mock).mockReturnValue({ mode: "dark" });

    render(
      <Router>
        <LoginForm />
      </Router>
    );

    // Check if the LoginForm component has the dark-mode class
    const loginForm = screen
      .getByRole("heading", { name: /login/i })
      .closest("div");
    expect(loginForm).toHaveClass("dark-mode");
  });

  it("has a working 'Sign up' link", () => {
    render(
      <Router>
        <LoginForm />
      </Router>
    );

    // Check if the signup link has the correct href
    const signupLink = screen.getByRole("link", { name: /sign up/i });
    expect(signupLink).toHaveAttribute("href", "/signup");
  });
});
