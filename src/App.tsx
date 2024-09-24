import React from "react";
import "./styles/App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppContent from "./components/AppContent/AppContent";
import { DarkModeProvider } from "./context/DarkModeContext";
import { AuthProvider } from "./context/AuthContext";
import { TodoProvider } from "./context/TodoContext";

const App: React.FC = () => {
  return (
    <Router>
      <DarkModeProvider>
        <AuthProvider>
          <TodoProvider>
            <Routes>
              <Route path="/" element={<AppContent />} />
            </Routes>
          </TodoProvider>
        </AuthProvider>
      </DarkModeProvider>
    </Router>
  );
};

export default App;
