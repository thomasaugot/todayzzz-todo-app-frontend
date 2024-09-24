import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { login, logout, isAuthenticated } from "../services/authService";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  mode: "dark" | "light";
  setMode: React.Dispatch<React.SetStateAction<"dark" | "light">>;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<boolean>(false);
  const [mode, setMode] = useState<"dark" | "light">("light");

  useEffect(() => {
    setAuth(isAuthenticated());
  }, []);

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    setAuth(true);
  };

  const handleLogout = () => {
    logout();
    setAuth(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: auth,
        login: handleLogin,
        logout: handleLogout,
        mode,
        setMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
