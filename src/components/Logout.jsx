import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate for routing

const Logout = () => {
  const navigate = useNavigate();  // Hook to navigate programmatically

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('userDetails');  // Remove user details from localStorage
    navigate('/login');  // Redirect to the login page using useNavigate hook
  };

  return (
    <div><Typography>Are you sure you want to log out?</Typography>

   
      {/* Button to trigger logout */}
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Logout;
