import { useState } from "react";
import "./LoginForm.scss";
import { useDarkMode } from "../../context/DarkmodeContext";

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mode } = useDarkMode();

  const handleLogin = () => {
    console.log(`Logged in with username: ${username} and password: ${password}`);
  };

  return (
    <div className={`LoginForm ${mode === "dark" ? "dark-mode" : "light-mode"}`}>
      <h2>Login</h2>
      <form>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
      <p>Not a member yet? Sign up!</p>
    </div>
  );
};

export default LoginForm;
