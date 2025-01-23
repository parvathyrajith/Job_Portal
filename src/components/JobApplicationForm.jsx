// ApplyFormPage.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';

const JobApplicationForm = () => {
  const { jobId } = useParams(); // Retrieve the job ID from the URL

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    alert('Application submitted for Job ID: ' + jobId);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom>
        Apply for Job ID: {jobId}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <input
          type="file"
          name="resume"
          onChange={handleFileChange}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: '20px' }}
        >
          Submit Application
        </Button>
      </form>
    </div>
  );
};


export default JobApplicationForm;