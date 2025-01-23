import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

const HomePage = () => {
  return (
    <>
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          color: "ActiveBorder",
          marginBottom: "2rem", 
          textTransform: "uppercase",
          fontFamily: "'Roboto', sans-serif",
        }}
      >
        Welcome to Job Portal
      </Typography>

      <Box sx={{ display: "flex", gap: "2rem" }}>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            sx={{
              fontSize: "1.1rem",
              padding: "1rem 2rem", 
              backgroundColor: "#3498db",
              color: "#fff", 
              "&:hover": {
                backgroundColor: "#2980b9",
              },
            }}
          >
            Login
          </Button>
        </Link>

        <Link to="/signup" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            sx={{
              fontSize: "1.1rem",
              padding: "1rem 2rem",
              borderColor: "#3498db",
              color: "#3498db", 
              fontWeight: "600", 
              "&:hover": {
                backgroundColor: "#3498db", 
                color: "#fff",
                borderColor: "#3498db", 
              },
            }}
          >
            Sign Up
          </Button>
        </Link>
      </Box>
      </>
    
  );
};

export default HomePage;