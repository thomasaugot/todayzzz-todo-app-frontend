// DarkmodeContext.tsx

import React, { createContext, ReactNode, useContext, useState } from "react";

type DarkModeContextType = {
  mode: "dark" | "light";
  setMode: (mode: "dark" | "light") => void;
};

export const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"dark" | "light">("dark");

  return <DarkModeContext.Provider value={{ mode, setMode }}>{children}</DarkModeContext.Provider>;
}

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
}
