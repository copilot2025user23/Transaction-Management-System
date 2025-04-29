import React, { useState } from "react";
import { mockApi } from "../mock/api"; // Import mockApi for fetching user details
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection

interface AuthComponentProps {
  onLoginSuccess: () => void;
}

const AuthComponent: React.FC<AuthComponentProps> = ({ onLoginSuccess }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Fetch user details from mockApi
      const users = await mockApi.getUserDetails();
      const user = users.find(
        (u) => u.mobileNumber === mobileNumber && u.password === password
      );

      if (user) {
        // Store user details in sessionStorage
        sessionStorage.setItem("accountId", user.accountId); // Set senderAccount as accountId
        sessionStorage.setItem("mobileNumber", user.mobileNumber); // Set mobile number
        localStorage.setItem("isAuthenticated", "true"); // Set authentication flag
        alert(`Welcome, ${user.firstName} ${user.lastName}!`); // Show welcome alert
        onLoginSuccess(); // Call the onLoginSuccess callback
        navigate("/"); // Redirect to the home page
      } else {
        setError("Invalid mobile number or password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div>
        <label>Mobile Number:</label>
        <input
          type="text"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          placeholder="Enter mobile number"
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default AuthComponent;