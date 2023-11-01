import { render, screen, fireEvent } from "@testing-library/react";
import DarkModeToggle from "./DarkModeToggle";
import { DarkModeProvider } from "../../context/DarkmodeContext";

export {};

describe("DarkModeToggle component", () => {
  it('renders the DarkModeToggle component with the "light" mode initially', () => {
    render(
      <DarkModeProvider>
        <DarkModeToggle />
      </DarkModeProvider>
    );

    // Assert that the component is rendered with the "light" mode initially
    expect(screen.getByTestId("dark-mode-toggle")).toBeInTheDocument();
    expect(screen.getByTestId("dark-mode-toggle-input")).toHaveAttribute("checked");
  });
});

it("toggles the dark mode when the toggle input is clicked", () => {
  render(
    <DarkModeProvider>
      <DarkModeToggle />
    </DarkModeProvider>
  );

  const toggleInput = screen.getByTestId("dark-mode-toggle-input");
  const darkModeIcon = screen.getByTestId("dark-mode-icon");

  // Click the toggle input to switch to dark mode
  fireEvent.click(toggleInput);

  // Assert that the toggle input is checked and dark mode icon is displayed
  expect(toggleInput).toHaveAttribute("checked");
  expect(darkModeIcon).toBeInTheDocument();

  // Click the toggle input again to switch back to light mode
  fireEvent.click(toggleInput);

  // Assert that the toggle input is not checked and the light mode icon is displayed
  expect(toggleInput).not.toHaveAttribute("checked");
  expect(darkModeIcon).not.toBeInTheDocument();
});
