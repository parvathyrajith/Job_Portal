import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

const ApplyPage = () => {
  const { jobId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const jobTitle = location.state?.JobTitle || "the job";
  const company = location.state?.Company || "Company";
  const locationName = location.state?.Location || "Location";
  const [coverLetter, setCoverLetter] = useState(null);
  const [resume, setResume] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [errors, setErrors] = useState({ coverLetter: false, resume: false });

  const handleCoverLetterChange = (event) => {
    setCoverLetter(event.target.files[0]);
    setErrors((prev) => ({ ...prev, coverLetter: false }));
  };

  const handleResumeChange = (event) => {
    setResume(event.target.files[0]);
    setErrors((prev) => ({ ...prev, resume: false }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const hasError = !coverLetter || !resume;
    setErrors({
      coverLetter: !coverLetter,
      resume: !resume,
    });

    if (hasError) return;

    const formData = new FormData();
    formData.append("fullName", event.target.fullName.value);
    formData.append("email", event.target.email.value);
    formData.append("jobId", jobId);
    formData.append("jobTitle", jobTitle);
    formData.append("company", company);
    formData.append("locationName", locationName);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);

    try {
      const response = await fetch("http://localhost:5000/api/apply", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setDialogOpen(true);
      } else {
        console.error("Failed to submit application");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  
  

  const handleDialogClose = () => {
    setDialogOpen(false);
    navigate("/view-applied-jobs", {
      state: {
        appliedJob: {
          JobTitle: jobTitle,
          Company: company,
          Location: locationName,
        },
      },
    });
  };

  return (
    <Paper
      sx={{
        padding: "20px",
        maxWidth: "800px",
        margin: "20px auto",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Apply for {jobTitle}
      </Typography>
      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <TextField name="fullName" label="Full Name" variant="outlined" fullWidth required />
          <TextField name="email" label="Email" variant="outlined" type="email" fullWidth required />
          <Box>
            <Typography variant="body1" gutterBottom>
              Upload Cover Letter:
            </Typography>
            <Button variant="contained" component="label" color="primary">
              Upload Cover Letter
              <input type="file" accept=".pdf,.doc,.docx" hidden onChange={handleCoverLetterChange} />
            </Button>
            {coverLetter && (
              <Typography variant="body2" color="textSecondary" sx={{ marginTop: "10px" }}>
                {coverLetter.name}
              </Typography>
            )}
            {errors.coverLetter && (
              <Typography variant="body2" color="error" sx={{ marginTop: "5px" }}>
                Cover letter is required.
              </Typography>
            )}
          </Box>
          <Box>
            <Typography variant="body1" gutterBottom>
              Upload Resume:
            </Typography>
            <Button variant="contained" component="label" color="primary">
              Upload Resume
              <input type="file" accept=".pdf,.doc,.docx" hidden onChange={handleResumeChange} />
            </Button>
            {resume && (
              <Typography variant="body2" color="textSecondary" sx={{ marginTop: "10px" }}>
                {resume.name}
              </Typography>
            )}
            {errors.resume && (
              <Typography variant="body2" color="error" sx={{ marginTop: "5px" }}>
                Resume is required.
              </Typography>
            )}
          </Box>
          <Button type="submit" variant="contained" color="primary" sx={{ alignSelf: "center" }}>
            Submit Application
          </Button>
        </Box>
      </form>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Application Submitted</DialogTitle>
        <DialogContent>
          <DialogContentText>Your application has been submitted successfully!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ApplyPage;
