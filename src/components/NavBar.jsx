import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [isProfileDrawerOpen, setIsProfileDrawerOpen] = useState(false);

  const toggleProfileDrawer = (open) => () => {
    setIsProfileDrawerOpen(open);
  };

  return (
    <>
      {/* AppBar */}
      <AppBar
        sx={{
          backgroundColor: '#1a237e',
          padding: '0.5rem 2rem',
          boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Left Side: Title */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Title */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                cursor: 'pointer',
                '&:hover': { color: '#ffd740' },
              }}
            >
              Job Portal
            </Typography>
          </Box>
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
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#ffffff' }}>
              User Name
            </Typography>
            <Typography variant="body2" sx={{ color: '#e0e0e0' }}>
              user@example.com
            </Typography>
          </Box>

          <Divider sx={{ margin: '1rem 0', borderColor: '#e0e0e0' }} /> {/* Adjust divider color */}

          {/* Profile Navigation */}
          <List>
            <ListItem button component={Link} to="/profile">
              <ListItemText primary="My Profile" sx={{ color: '#ffffff' }} /> {/* Adjust text color */}
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

export default NavBar;
