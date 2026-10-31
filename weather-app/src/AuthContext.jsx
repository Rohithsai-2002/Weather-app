import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("weatherUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function register(name, email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const exists = users.some(
      (item) => item.email === email
    );

    if (exists) {
      return { success: false, message: "Email already registered." };
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    return { success: true, message: "Registration successful." };
  }

  function login(email, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const foundUser = users.find(
      (item) => item.email === email && item.password === password
    );

    if (!foundUser) {
      return { success: false, message: "Invalid email or password." };
    }

    const loggedInUser = {
      name: foundUser.name,
      email: foundUser.email,
    };

    localStorage.setItem("weatherUser", JSON.stringify(loggedInUser));
    setUser(loggedInUser);

    return { success: true };
  }

  function logout() {
    localStorage.removeItem("weatherUser");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}