import { render, screen, fireEvent } from "@testing-library/react";
import Sidebar from "./Sidebar";

describe("Sidebar component", () => {
  it("renders the Sidebar component with initial closed state", () => {
    render(<Sidebar />);
    // Assert that the Sidebar is initially closed
    expect(screen.getByTestId("sidebar")).toHaveClass("sidebar");
    expect(screen.getByTestId("sidebar")).not.toHaveClass("open");
  });

  it("toggles the Sidebar when the toggle button is clicked", () => {
    render(<Sidebar />);
    const toggleButton = screen.getByTestId("toggle-button");

    // Click the toggle button to open the Sidebar
    fireEvent.click(toggleButton);

    // Assert that the Sidebar is open
    expect(screen.getByTestId("sidebar")).toHaveClass("open");

    // Click the toggle button again to close the Sidebar
    fireEvent.click(toggleButton);

    // Assert that the Sidebar is closed again
    expect(screen.getByTestId("sidebar")).not.toHaveClass("open");
  });
});

// for the login modal

describe("Login modal", () => {
  it('opens the login modal when the "Login" button is clicked', () => {
    render(<Sidebar />);
    const loginButton = screen.getByText("Login");

    // Click the "Login" button to open the login modal
    fireEvent.click(loginButton);

    // Assert that the login modal is open
    expect(screen.getByTestId("login-modal")).toBeInTheDocument();
  });

  it("closes the login modal when the close icon is clicked", () => {
    render(<Sidebar />);
    const loginButton = screen.getByText("Login");

    // Click the "Login" button to open the login modal
    fireEvent.click(loginButton);

    // Assert that the login modal is open
    expect(screen.getByTestId("login-modal")).toBeInTheDocument();

    // Close the login modal by clicking the close icon
    const closeIcon = screen.getByTestId("close-icon");
    fireEvent.click(closeIcon);

    // Assert that the login modal is closed
    expect(screen.queryByTestId("login-modal")).toBeNull();
  });
});
