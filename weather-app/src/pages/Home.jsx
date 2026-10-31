import React from "react";
import "./Home.css";

function Home({ onLogin, onRegister }) {
  return (
    <div className="home-container">
      <div className="home-box">
        <h1>🌤️ Weather App</h1>
        <h2>Welcome to Weather App</h2>
        <p>
          Check the current weather of your favorite cities.
        </p>

        <button onClick={onLogin}>Login</button>
        <button onClick={onRegister}>Register</button>
      </div>
    </div>
  );
}

export default Home;