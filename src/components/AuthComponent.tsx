import React from "react";
import { useNavigate } from "react-router-dom";
import "./AuthComponent.css";

interface AuthComponentProps {
  onLoginSuccess: () => void;
}

const AuthComponent: React.FC<AuthComponentProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleLogin = async () => {
    try {
      // Simulate login success
      onLoginSuccess();
      navigate("/"); // Redirect to Home Page after login
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="auth-container">
      <h2>Please Log In</h2>
      <button className="login-button" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default AuthComponent;