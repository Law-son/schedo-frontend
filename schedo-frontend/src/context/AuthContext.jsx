// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create AuthContext
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null); // To store error messages

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setAuthError(null); // Reset error state before a new request
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/accounts/login/`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        const token = response.data.token;
        localStorage.setItem("token", token); // Store token in localStorage
        setToken(token);
        console.log("Login successful:", response.data.message);
        return true; // Return success
      } else if (
        response.data.status === "error" &&
        response.data.message === "Invalid email or password"
      ) {
        setAuthError(response.data.message); // Set error message for invalid credentials
        return false; // Return failure
      } else {
        setAuthError("Login failed");
        return false; // Return failure
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setAuthError(error.response.data.message); // Set specific error message
      } else {
        setAuthError("An error occurred during login.");
      }
      console.error("Login error:", error);
      return false; // Return failure
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (email, password) => {
    setLoading(true);
    setAuthError(null); // Reset error state before a new request
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/accounts/signup/`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        const token = response.data.token;
        localStorage.setItem("token", token); // Store token in localStorage
        setToken(token);
        console.log("Signup successful:", response.data.message);
        return true; // Return success
      } else if (
        response.data.status === "error" &&
        response.data.errors?.email
      ) {
        setAuthError(response.data.errors.email[0]); // Extract and set specific email error
        return false; // Return failure
      } else {
        setAuthError("Signup failed");
        return false; // Return failure
      }
    } catch (error) {
      if (error.response && error.response.data.errors?.email) {
        setAuthError(error.response.data.errors.email[0]); // Set specific email error
      } else {
        setAuthError("An error occurred during signup.");
      }
      console.error("Signup error:", error);
      return false; // Return failure
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
    <AuthContext.Provider
      value={{ login, signup, logout, isAuthenticated, loading, authError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
