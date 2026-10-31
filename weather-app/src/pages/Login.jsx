import React, { useState } from "react";
import "./Login.css";

function Login({ onLogin, onRegisterClick, onHome }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    onLogin(email, password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🌤️ Weather App</h1>
        <h2>Welcome Back!</h2>
        <p>Login to check the weather</p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="register-text">
          Don't have an account?
          <button type="button" onClick={onRegisterClick}>
            Register
          </button>
        </p>

        <button type="button" onClick={onHome}>
          Home
        </button>
      </div>
    </div>
  );
}

export default Login;