import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../src/styles/auth.css";

const LoginPage = ({ onLoginSuccess }) => {
  const { login, register, isLoading, error: authError } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    setError("");

    if (!formData.email) {
      setError("Email is required");
      return false;
    }

    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return false;
    }

    if (!formData.password) {
      setError("Password is required");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    if (!isLoginMode) {
      if (!formData.username) {
        setError("Username is required");
        return false;
      }

      if (formData.username.length < 3) {
        setError("Username must be at least 3 characters");
        return false;
      }

      if (!formData.confirmPassword) {
        setError("Please confirm your password");
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (isLoginMode) {
        await login(formData.email, formData.password);
      } else {
        await register(
          formData.username,
          formData.email,
          formData.password,
          formData.confirmPassword
        );
      }
      onLoginSuccess();
    } catch (err) {
      // Error is handled by useAuth hook
    }
  };

  const displayError = error || authError;

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>{isLoginMode ? "Login" : "Register"}</h1>

        {displayError && <div className="error-message">{displayError}</div>}

        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                disabled={isLoading}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              disabled={isLoading}
            />
          </div>

          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                disabled={isLoading}
              />
            </div>
          )}

          <button
            type="submit"
            className="btn-submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : isLoginMode ? "Login" : "Register"}
          </button>
        </form>

        <div className="toggle-auth">
          <p>
            {isLoginMode ? "Don't have an account? " : "Already have an account? "}
            <button
              type="button"
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                setError("");
                setFormData({
                  email: "",
                  password: "",
                  username: "",
                  confirmPassword: "",
                });
              }}
              className="toggle-btn"
            >
              {isLoginMode ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
