import { useState } from "react";
import { useDarkMode } from "../../context/DarkmodeContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.scss";
import { useTodosContext } from "../../context/TodosContext";

// Common form component
const AuthForm: React.FC<{
  title: string;
  onSubmit: (data: { username: string; password: string }) => void;
  buttonText: string;
  onToggle: () => void;
  successMessage: string;
  setSuccessMessage: any;
}> = ({ title, onSubmit, buttonText, onToggle, successMessage, setSuccessMessage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mode } = useDarkMode();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({ username, password });
  };

  return (
    <div className={`card ${mode === "dark" ? "dark-mode" : "light-mode"}`}>
      <h2>{title}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="auth-username">Username</label>
        <input
          type="text"
          id="auth-username"
          className="input-box"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="auth-password">Password</label>
        <input
          type="password"
          id="auth-password"
          className="input-box"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">{buttonText}</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
      <button className="signup-link" onClick={onToggle}>
        {title === "Login" ? "Not a member yet? Sign up!" : "Already have an account? Login"}
      </button>
    </div>
  );
};

// Main LoginSignup component
const LoginSignup: React.FC = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const { mode } = useDarkMode();
  const { dispatch } = useTodosContext();
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsLoginForm(!isLoginForm);
  };

  const handleLogin = async (data: { username: string; password: string }) => {
    try {
      const response = await axios.post("/api/login", data);

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);

        const userResponse = await axios.get("/api/user");
        dispatch({ type: "SET_USER", payload: userResponse.data });

        console.log("Logged in successfully!");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleSignup = async (data: { username: string; password: string }) => {
    try {
      const response = await axios.post("/api/users", {
        firstname: data.username,
        lastname: "",
        collections: [],
        todo_items: [],
      });

      if (response.data.status === "success") {
        const userResponse = await axios.get("/api/user");
        dispatch({ type: "SET_USER", payload: userResponse.data });

        console.log("Account created successfully!");
        setSuccessMessage("Account created successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        console.error("Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  return (
    <div className={`LoginForm ${mode === "dark" ? "dark-mode" : "light-mode"}`}>
      <div className="card-container">
        {isLoginForm ? (
          <AuthForm
            title="Login"
            onSubmit={handleLogin}
            buttonText="Login"
            onToggle={handleToggle}
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
          />
        ) : (
          <AuthForm
            title="Sign Up"
            onSubmit={handleSignup}
            buttonText="Sign Up"
            onToggle={handleToggle}
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
          />
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
