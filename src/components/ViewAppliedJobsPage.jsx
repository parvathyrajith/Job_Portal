import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Grid, Box } from "@mui/material";

const ViewAppliedJobsPage = () => {
  const location = useLocation();
  const [appliedJob, setAppliedJob] = useState(null);

  useEffect(() => {
    if (location.state?.appliedJob) {
      setAppliedJob(location.state.appliedJob);
    }
  }, [location.state]);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Applied Job Details
      </Typography>
      {appliedJob ? (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              sx={{
                padding: "20px",
                background: "#f5f5f5",
                borderRadius: "10px",
              }}
            >
              <Typography variant="h6">{appliedJob.JobTitle}</Typography>
              <Typography variant="body2">Company: {appliedJob.Company}</Typography>
              <Typography variant="body2">Location: {appliedJob.Location}</Typography>
              
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="body1" align="center">
          No applied job details available.
        </Typography>
      )}
    </div>
  );
};

export default ViewAppliedJobsPage;
