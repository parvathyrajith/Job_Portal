import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  IconButton,
  Drawer,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";

const NavBar3 = () => {
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);
  const [user, setUser] = useState({ Name: "", Email: "" }); // State to hold user info

  // Fetch user details from localStorage or another source
  useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleProfileDrawer = (open) => () => {
    setIsProfileDrawerOpen(open);
  };

  return (
    <>
      {/* User Dashboard NavBar */}
      <AppBar
        sx={{
          backgroundColor: "#1a237e",
          padding: "0.5rem 2rem",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left Side: Navigation Buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "white",
                cursor: "pointer",
                "&:hover": { color: "#ffd740" },
              }}
            >
              Admin Dashboard
            </Typography>
            <Link to="/manage-jobs" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  color: "black",
                  backgroundColor: "#ADD8E6",
                  "&:hover": { backgroundColor: "#ff2c2c", color: "#ffffff" },
                }}
              >
                Manage Jobs
              </Button>
            </Link>

            <Link to="/view-applications" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  color: "black",
                  backgroundColor: "#ADD8E6",
                  "&:hover": { backgroundColor: "#ff2c2c", color: "#ffffff" },
                }}
              >
                View Applications
              </Button>
            </Link>

            <Link to="/logout" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  color: "black",
                  backgroundColor: "#ADD8E6",
                  "&:hover": { backgroundColor: "#ff2c2c", color: "#ffffff" },
                }}
              >
                Logout
              </Button>
            </Link>
          </Box>

          {/* Right Side: Profile Button */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleProfileDrawer(true)}
          >
            <Avatar alt="User Profile" sx={{ bgcolor: "#ADD8E6" }}>
            {user.name ? user.name.charAt(0) : 'A'}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* ProfileDrawer */}
      <Drawer anchor="left" open={isProfileDrawerOpen} onClose={toggleProfileDrawer(false)}>
        <Box
          sx={{
            width: 250,
            padding: "1rem",
            backgroundColor: "#187593", // Added background color
          }}
          role="presentation"
          onClick={toggleProfileDrawer(false)}
          onKeyDown={toggleProfileDrawer(false)}
        >
          {user ? (
            <>
              {/* Profile Section */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Avatar sx={{ bgcolor: "#1a237e", width: 70, height: 70 }}>
                {user.Name ? user.Name.charAt(0) : 'A'}
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#ffffff" }}
                >
                  {user?.Name}
                </Typography>
                <Typography variant="body2" sx={{ color: "#e0e0e0" }}>
                  {user?.Email}
                </Typography>
              </Box>

              <Divider sx={{ margin: "1rem 0", borderColor: "#e0e0e0" }} />

              {/* Profile Navigation */}
              <List>
                <ListItem button component={Link} to="/profile">
                  <ListItemText primary="My Profile" sx={{ color: "#ffffff" }} />
                </ListItem>

                <ListItem button component={Link} to="/logout">
                  <ListItemText primary="Logout" sx={{ color: "#ffffff" }} />
                </ListItem>
              </List>
            </>
          ) : (
            <Typography color="error" sx={{ textAlign: "center" }}>
              User information not available.
            </Typography>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default NavBar3;