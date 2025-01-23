import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Box, Typography, IconButton, Drawer, Avatar, List, ListItem, ListItemText, Divider } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar2 = () => {
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [user, setUser] = useState({ name: 'User', email: 'user@example.com' });// State to store user details
  
  // Fetch user details from localStorage when the component mounts
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userDetails') || '{}');
    if (userData) {
      setUser(userData);  // Set user data in state
    }
  }, []);

  const toggleProfileDrawer = (open) => () => {
    setIsProfileDrawerOpen(open);
  };

  return (
    <>
      {/* User Dashboard NavBar */}
      <AppBar sx={{ backgroundColor: "#1a237e", padding: "0.5rem 2rem", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", alignItems: 'center', gap: 2 }}>
            {/* Wrap Typography in Link to redirect */}
            <Link to="/user-dashboard" style={{ textDecoration: "none" }}>
              <Typography 
                variant="h5" 
                sx={{ 
                  fontWeight: "bold", 
                  color: "white", 
                  cursor: "pointer", 
                  "&:hover": { color: "#ffd740" } 
                }}
              >
                User Dashboard
              </Typography>
            </Link>

            {/* Navigation Buttons */}
            <Link to="/browse-jobs" style={{ textDecoration: "none" }}>
              <Button variant="contained" sx={{ color: "black", backgroundColor: "#ADD8E6", "&:hover": { backgroundColor: "#ff2c2c", color: "#ffffff" } }}>
                Browse Jobs
              </Button>
            </Link>

            <Link to="/applied-jobs" style={{ textDecoration: "none" }}>
              <Button variant="contained" sx={{ color: "black", backgroundColor: "#ADD8E6", "&:hover": { backgroundColor: "#ff2c2c", color: "#ffffff" } }}>
                View Applied Jobs
              </Button>
            </Link>

            <Link to="/logout" style={{ textDecoration: "none" }}>
              <Button variant="contained" sx={{ color: "black", backgroundColor: "#ADD8E6", "&:hover": { backgroundColor: "#ff2c2c", color: "#ffffff" } }}>
                Logout
              </Button>
            </Link>
          </Box>

          {/* Menu Button for ProfileDrawer */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ display: { xs: 'block', md: 'block' } }}
            onClick={toggleProfileDrawer(true)}
          >
            <Avatar alt="User Profile" sx={{ bgcolor: '#ADD8E6' }}>
  {user.name ? user.name.charAt(0) : 'U'} {/* Show 'U' as a fallback */}
</Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ProfileDrawer */}
      <Drawer anchor="left" open={isProfileDrawerOpen} onClose={toggleProfileDrawer(false)}>
        <Box
          sx={{
            width: 250,
            padding: '1rem',
            backgroundColor: '#187593', // Added background color
          }}
          role="presentation"
          onClick={toggleProfileDrawer(false)}
          onKeyDown={toggleProfileDrawer(false)}
        >
          {/* Profile Section */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Avatar alt="User Profile" sx={{ bgcolor: '#ADD8E6' }}>
  {user.name ? user.name.charAt(0) : 'U'} {/* Show 'U' as a fallback */}
</Avatar>
<Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
  {user.name || 'User Name'}
</Typography>

<Typography variant="body2" sx={{ color: '#e0e0e0' }}>
  {user.email || 'user@example.com'}
</Typography>
          </Box>

          <Divider sx={{ margin: '1rem 0', borderColor: '#e0e0e0' }} />

          {/* Profile Navigation */}
          <List>
  <ListItem button component={Link} to="/profile">
    <ListItemText primary="My Profile" sx={{ color: '#ffffff' }} />
  </ListItem>
  <ListItem button component={Link} to="/logout">
    <ListItemText primary="Logout" sx={{ color: '#ffffff' }} />
  </ListItem>
</List>


        </Box>
      </Drawer>
    </>
  );
};

export default NavBar2;
