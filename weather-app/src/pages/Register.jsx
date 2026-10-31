import React, { useState } from "react";
import "./Register.css";

function Register({ onRegister, onHome }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    onRegister(email, password);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h1>🌤️ Weather App</h1>
        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>
          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit">Register</button>
        </form>

        <p>Already have an account?</p>

        <button type="button" onClick={() => onRegister(null, null)}>
          Back to Login
        </button>

        <button type="button" onClick={onHome}>
          Home
        </button>
      </div>
    </div>
  );
}

export default Register;