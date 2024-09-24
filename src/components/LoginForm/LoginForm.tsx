import React, { useState } from "react";
import "./LoginForm.scss";
import { useAuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, mode } = useAuthContext();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await login(username, password);
      console.log(`Logged in with username: ${username}`);
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("An unknown error occurred");
      }
    }
  };

  return (
    <div
      className={`LoginForm ${mode === "dark" ? "dark-mode" : "light-mode"}`}
    >
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-box"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-box"
          required
        />

        <button type="submit">Login</button>
      </form>
      <Link to="/signup" className="signup-link">
        Not a member yet? Sign up!
      </Link>
    </div>
  );
};

export default LoginForm;
