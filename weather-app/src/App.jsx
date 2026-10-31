import React, { useState } from "react";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Weather from "./components/weather.jsx";

function App() {
  const [page, setPage] = useState("home");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleRegister = (email, password) => {
    if (email && password) {
      alert("Registration successful! Please login.");
    }
    setPage("login");
  };

  if (loggedIn) {
    return <Weather />;
  }

  if (page === "home") {
    return (
      <Home
        onLogin={() => setPage("login")}
        onRegister={() => setPage("register")}
      />
    );
  }

  if (page === "login") {
    return (
      <Login
        onLogin={() => setLoggedIn(true)}
        onRegisterClick={() => setPage("register")}
      />
    );
  }

  return <Register onRegister={handleRegister} />;
}

export default App;