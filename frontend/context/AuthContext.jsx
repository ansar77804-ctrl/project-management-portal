import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  const register = async (username, email, password, confirmPassword) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.post(`${API_URL}/api/auth/register`, {
        username,
        email,
        password,
        confirmPassword
      });
      const { user, token } = response.data;
      setUser(user);
      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      });
      const { user, token } = response.data;
      setUser(user);
      setToken(token);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        register,
        login,
        logout,
        isAuthenticated: !!token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
