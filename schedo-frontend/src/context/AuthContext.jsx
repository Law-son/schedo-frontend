// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create AuthContext
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post("https://your-django-backend.com/api/login/", {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token); // Store token in localStorage
      setToken(token);
      // Navigation will happen where the login function is called
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    // Navigation will happen where the logout function is called
  };

  const isAuthenticated = !!token;

  // Provide token in the Axios Authorization header for protected routes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
