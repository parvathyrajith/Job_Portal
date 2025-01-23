import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  Grid,
  Container,
  Box,
} from "@mui/material";

const ManageJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({ JobTitle: "", Company: "", Location: "" });
  const [selectedJob, setSelectedJob] = useState(null);
  const [updatedJob, setUpdatedJob] = useState({ JobTitle: "", Company: "", Location: "" });

  // Fetch jobs when the component mounts
  React.useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/jobs");
        const data = await response.json();
        setJobs(data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, []);

  // Add a new job
  const handleAddJob = async () => {
    try {
      // Ensure the object keys match what the backend expects
      const response = await fetch('http://localhost:5000/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          JobTitle: newJob.JobTitle, // Corrected the field name to match backend
          Company: newJob.Company, // Corrected the field name to match backend
          Location: newJob.Location, // Corrected the field name to match backend
          
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // If the job was added successfully, update the jobs list
        setJobs([...jobs, data.job]);
        setNewJob({ JobTitle: '', Company: '', Location: ''}); // Clear form
      } else {
        // Handle error response from the backend
        console.error('Failed to add job:', data.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };
  

  // Delete a job
  const handleRemoveJob = async (_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/jobs/${_id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      if (data.success) {
        setJobs(jobs.filter((job) => job._id !== _id));
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  // Update a job
  // Update a job
const handleUpdateJob = async () => {
  if (!updatedJob.JobTitle || !updatedJob.Company || !updatedJob.Location) {
    alert("All fields must be filled out to update the job.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:5000/api/jobs/${selectedJob}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedJob),
    });

    const data = await response.json();
    if (data.success) {
      // Update the jobs list with the updated job data
      setJobs(
        jobs.map((job) =>
          job._id === selectedJob ? { ...job, ...updatedJob } : job
        )
      );
      setSelectedJob(null);
      setUpdatedJob({ JobTitle: '', Company: '', Location: '' });
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error('Error updating job:', error);
  }
};


  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #4a90e2, #1c1e21)", 
        boxSizing: "border-box",
        paddingTop: "80px",
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          sx={{
            fontWeight: "bold",
            marginBottom: "30px",
            color: "#fff",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          }}
        >
          Manage Jobs
        </Typography>

        {/* Add Job Section */}
        <div style={{ marginBottom: "30px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="JobTitle"
                variant="outlined"
                value={newJob.JobTitle}
                onChange={(e) => setNewJob({ ...newJob, JobTitle: e.target.value })}
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#0e2735",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Company"
                variant="outlined"
                value={newJob.Company}
                onChange={(e) =>
                  setNewJob({ ...newJob, Company: e.target.value })
                }
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#0e2735",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                value={newJob.Location}
                onChange={(e) =>
                  setNewJob({ ...newJob, Location: e.target.value })
                }
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#0e2735",
                }}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="info"
                onClick={handleAddJob}
                sx={{
                  padding: "10px 30px",
                  borderRadius: "50px",
                  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                  "&:hover": {
                    backgroundColor: "#2c6cd1",
                    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                Add Job
              </Button>
            </Grid>
          </Grid>
        </div>

        {/* Job Listings */}
        <Grid container spacing={4}>
          {jobs.map((job) => (
            <Grid item xs={12} sm={6} key={job._id}>
              <Card
                sx={{
                  background: "#fff",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  padding: "20px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ fontWeight: "500", color: "#333" }}>
                    {job.JobTitle}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginTop: "8px" }}>
                    <strong>Company:</strong> {job.Company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ marginTop: "8px" }}>
                    <strong>Location:</strong> {job.Location}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    onClick={() => handleRemoveJob(job._id)}
                    sx={{
                      borderRadius: "50px",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#f44336",
                        color: "#fff",
                      },
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setSelectedJob(job._id);
                      setUpdatedJob({
                        JobTitle: job.JobTitle,
                        Company: job.Company,
                        Location: job.Location,
                      });
                    }}
                    sx={{
                      borderRadius: "50px",
                      textTransform: "none",
                      "&:hover": {
                        backgroundColor: "#2c6cd1",
                      },
                    }}
                  >
                    Update
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Update Job Section */}
        {selectedJob && (
          <div style={{ marginTop: "30px" }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: "500", color: "#333" }}>
              Update Job
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Updated Job Title"
                  variant="outlined"
                  value={updatedJob.JobTitle}
                  onChange={(e) =>
                    setUpdatedJob({ ...updatedJob, JobTitle: e.target.value })
                  }
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Updated Company"
                  variant="outlined"
                  value={updatedJob.Company}
                  onChange={(e) =>
                    setUpdatedJob({ ...updatedJob, Company: e.target.value })
                  }
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Updated Location"
                  variant="outlined"
                  value={updatedJob.Location}
                  onChange={(e) =>
                    setUpdatedJob({ ...updatedJob, Location: e.target.value })
                  }
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: "#0e2735",
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={handleUpdateJob}
                  sx={{
                    padding: "10px 30px",
                    borderRadius: "50px",
                    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                    "&:hover": {
                      backgroundColor: "#ff9800",
                      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
                    },
                  }}
                >
                  Update Job
                </Button>
              </Grid>
            </Grid>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ManageJobsPage;
