import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import MobileMenu from "./MobileMenu";

describe("MobileMenu component", () => {
  it("renders the MobileMenu component", () => {
    render(<MobileMenu />);

    // Assert that the menu is initially closed
    expect(screen.getByTestId("mobile-menu")).toBeInTheDocument();
    expect(screen.queryByTestId("menu-content")).not.toHaveClass("open");
  });

  it("opens and closes the menu when the toggle button is clicked", () => {
    render(<MobileMenu />);

    const menuToggleButton = screen.getByRole("button", {
      name: /toggle menu/i,
    });

    // Click the toggle button to open the menu
    fireEvent.click(menuToggleButton);
    expect(screen.getByTestId("menu-content")).toHaveClass("open");

    // Click the toggle button again to close the menu
    fireEvent.click(menuToggleButton);
    expect(screen.queryByTestId("menu-content")).not.toHaveClass("open");
  });

  it('opens the login modal when the "Login" button is clicked', () => {
    render(<MobileMenu />);

    const loginButton = screen.getByText("Login");

    // Click the "Login" button to open the login modal
    fireEvent.click(loginButton);
    expect(screen.getByTestId("login-modal")).toBeInTheDocument();
  });

  it("closes the login modal when the close icon is clicked", () => {
    render(<MobileMenu />);

    const loginButton = screen.getByText("Login");

    // Click the "Login" button to open the login modal
    fireEvent.click(loginButton);
    expect(screen.getByTestId("login-modal")).toBeInTheDocument();

    const closeIcon = screen.getByRole("img", { name: /close menu/i });
    fireEvent.click(closeIcon);

    // Assert that the login modal is closed
    expect(screen.queryByTestId("login-modal")).toBeNull();
  });
});
