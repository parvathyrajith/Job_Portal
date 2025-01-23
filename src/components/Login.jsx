import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Change this to useNavigate

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();  // Use navigate hook for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before making request

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.success) {
        // Store user details in localStorage
        localStorage.setItem('userDetails', JSON.stringify({
          userId: result.userId,
          name: result.name,
          email: result.email
        }));

        // Redirect based on user role (check if user is admin or regular)
        if (result.userId === "67827e1ac9c8fdfdf78fa666") {
          navigate("/admin-dashboard"); // Admin dashboard
        } else {
          navigate("/user-dashboard"); // User dashboard
        }
      } else {
        setError(result.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login">
      <Typography variant="h4" gutterBottom>Login Page</Typography>
      
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="contained" color="primary" fullWidth type="submit" sx={{ marginTop: 2 }}>
          Login
        </Button>
      </form>
      
      <div style={{ marginTop: "20px" }}>
        New User? <a href="/signup">Sign Up</a>
      </div>

      {error && <Typography color="error" sx={{ marginTop: 2 }}>{error}</Typography>}
    </div>
  );
};

export default Login;
