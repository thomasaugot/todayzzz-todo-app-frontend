import { useState } from "react";
import { useDarkMode } from "../../context/DarkmodeContext";
import "./LoginSignup.scss";

// Login form component
const LoginForm: React.FC<{ onToggle: () => void }> = ({ onToggle }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mode } = useDarkMode();

  const handleLogin = () => {
    console.log(`Logged in with username: ${username} and password: ${password}`);
  };

  return (
    <div className={`card login ${mode === "dark" ? "dark-mode" : "light-mode"}`}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="login-username">Username</label>
        <input
          type="text"
          id="login-username"
          className="input-box"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          id="login-password"
          className="input-box"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
      <button className="signup-link" onClick={onToggle}>
        Not a member yet? Sign up!
      </button>
    </div>
  );
};

// Signup form component
const SignupForm: React.FC<{ onToggle: () => void }> = ({ onToggle }) => {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { mode } = useDarkMode();

  const handleSignup = () => {
    console.log(`Signed up with username: ${newUsername} and password: ${newPassword}`);
  };

  return (
    <div className={`card signup ${mode === "dark" ? "dark-mode" : "light-mode"}`}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <label htmlFor="signup-username">New Username</label>
        <input
          type="text"
          id="signup-username"
          value={newUsername}
          className="input-box"
          onChange={(e) => setNewUsername(e.target.value)}
        />

        <label htmlFor="signup-password">New Password</label>
        <input
          type="password"
          id="signup-password"
          className="input-box"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button type="submit">Sign Up</button>
      </form>
      <button className="signup-link" onClick={onToggle}>
        Already have an account? Login
      </button>
    </div>
  );
};

// Main LoginForm component
const LoginSignup: React.FC = () => {
  const [isLoginForm, setIsLoginForm] = useState(true);
  const { mode } = useDarkMode();

  const handleToggle = () => {
    setIsLoginForm(!isLoginForm);
  };

  return (
    <div className={`LoginForm ${mode === "dark" ? "dark-mode" : "light-mode"}`}>
      <div className="card-container">
        {isLoginForm ? (
          <LoginForm onToggle={handleToggle} />
        ) : (
          <SignupForm onToggle={handleToggle} />
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
