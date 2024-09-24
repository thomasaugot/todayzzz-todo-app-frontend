import React, { createContext, useState, useEffect, useContext } from "react";

interface DarkModeContextProps {
  mode: "dark" | "light";
  setMode: React.Dispatch<React.SetStateAction<"dark" | "light">>;
  toggleMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextProps | undefined>(
  undefined
);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<"dark" | "light">(
    localStorage.getItem("mode") === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark-mode", mode === "dark");
    root.classList.toggle("light-mode", mode === "light");
    localStorage.setItem("mode", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  return (
    <DarkModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
