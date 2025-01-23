import React, { useEffect, useState } from 'react';
import { Typography, Grid, Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Card, CardContent } from '@mui/material';
import { blue, grey } from '@mui/material/colors';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    location: '',
    bio: ''
  });
  const [editableProfile, setEditableProfile] = useState({
    name: '',
    email: '',
    location: '',
    bio: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Fetch profile data on page load
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    
    if (userId) {
      fetch(`http://localhost:5000/profile/${userId}`)
        .then(res => res.json())
        .then(data => {
          setProfile(data); // Set the profile data
          setEditableProfile(data); // Set editable profile data
        })
        .catch(err => console.error(err));
    }
  }, []);
  
  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditableProfile({
      ...editableProfile,
      [field]: value
    });
  };

  const handleSave = () => {
    // Assuming you're storing the user ID in localStorage after successful signup/login
    const userId = localStorage.getItem('userId');
    
    if (userId) {
      fetch("http://localhost:5000/profile/edit/${userId}", {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editableProfile),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setProfile(editableProfile); // Update the profile with new data
            setIsEditing(false);
          } else {
            alert("Error saving changes!");
          }
        })
        .catch(err => console.error(err));
    }
  };

  return (
    <Box>
      <Card sx={{ maxWidth: 500, margin: 'auto', padding: 2 }}>
        <CardContent>
          <Typography variant="h5">{profile.name}</Typography>
          <Typography variant="body2" sx={{ color: grey[600] }}>
            {profile.email}
          </Typography>
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ fontWeight: "bold", color: blue[700] }}>
                Location:
              </Typography>
              <Typography variant="body2" sx={{ color: grey[600] }}>
                {profile.location}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ fontWeight: "bold", color: blue[700] }}>
                Bio:
              </Typography>
              <Typography variant="body2" sx={{ color: grey[600] }}>
                {profile.bio}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Button variant="contained" color="primary" onClick={() => setIsEditing(true)} sx={{ mt: 2 }}>
        Edit Profile
      </Button>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditing} onClose={handleCloseEdit} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Name"
              value={editableProfile.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              fullWidth
            />
            <TextField
              label="Email"
              value={editableProfile.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              fullWidth
            />
            <TextField
              label="Location"
              value={editableProfile.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              fullWidth
            />
            <TextField
              label="Bio"
              value={editableProfile.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              multiline
              rows={3}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;