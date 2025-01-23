import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required!');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword })
      });

      const result = await response.json();
      if (!result.success) {
        setError(result.message);
      } else {
        alert("Sign up successful!");
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        navigate("/login"); // Redirect to login page after successful signup
      }
    } catch (err) {
      console.error("Error signing up:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup">
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: 2,
        gap: 2
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Sign Up
      </Typography>
      <form onSubmit={handleSubmit} style={{ width: "100%", maxWidth: 400 }}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          fullWidth
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          margin="normal"
        />
        {error && <Typography color="error" variant="body2" marginTop={1}>{error}</Typography>}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
          <Button type="submit" variant="contained">
            Sign Up
          </Button>
        </Box>
      </form>
    </Box>
    </div>
  );
};

export default SignupPage;
