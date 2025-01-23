import React, { useEffect, useState } from "react";
import { Typography, Grid, TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BrowseJobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchCompany, setSearchCompany] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/jobs"); // Fetch jobs from backend
        if (Array.isArray(response.data)) {
          console.log("Jobs fetched:", response.data);
          setJobs(response.data);
          setFilteredJobs(response.data);
        } else {
          console.error("Invalid data format received:", response.data);
          setJobs([]);
          setFilteredJobs([]);
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
        setFilteredJobs([]);
      }
    };

    fetchJobs(); // Call to fetch jobs when the component mounts
  }, []);

  const handleSearch = () => {
    const locationQuery = searchLocation.trim().toLowerCase();
    const companyQuery = searchCompany.trim().toLowerCase();

    const filtered = jobs.filter((job) => {
      const jobLocation = job?.Location?.toLowerCase() || ""; // Handle null/undefined
      const jobCompany = job?.Company?.toLowerCase() || ""; // Handle null/undefined

      return (
        jobLocation.includes(locationQuery) &&
        jobCompany.includes(companyQuery)
      );
    });

    setFilteredJobs(filtered);
  };

  const handleApplyClick = (job) => {
    navigate(`/apply/${job._id}`, {
      state: {
        JobTitle: job?.JobTitle || "N/A",
        Company: job?.Company || "N/A",
        Location: job?.Location || "N/A",
      },
    });
  };

  return (
    <div className="browse-jobs-container" style={{ padding: "60px" }}>
      <Typography variant="h4" align="center" style={{ marginBottom: "30px" }}>
        Browse Jobs
      </Typography>

      {/* Search Filters */}
      <Box style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <TextField
          label="Search by Location"
          variant="outlined"
          fullWidth
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <TextField
          label="Search by Job Type"
          variant="outlined"
          fullWidth
          value={searchCompany}
          onChange={(e) => setSearchCompany(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          style={{ minWidth: "150px" }}
        >
          Search
        </Button>
      </Box>

      {/* Jobs List */}
      <Grid container spacing={3}>
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <div
                className="job-item"
                style={{
                  padding: "20px",
                  background: "#2f2f2f",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              >
                <Typography variant="h6" style={{ color: "#2196F3" }}>
                  {job?.JobTitle || "Unknown Title"}
                </Typography>
                <Typography variant="body2" style={{ color: "#ddd" }}>
                  <strong>Location:</strong> {job?.Location || "Not specified"}
                </Typography>
                <Typography variant="body2" style={{ color: "#ddd" }}>
                  <strong>Company:</strong> {job?.Company || "Not specified"}
                </Typography>
                
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "10px" }}
                  onClick={() => handleApplyClick(job)}
                >
                  Apply
                </Button>
              </div>
            </Grid>
          ))
        ) : (
          <Typography
            variant="h6"
            align="center"
            style={{ width: "100%", marginTop: "20px" }}
          >
            No jobs found. Please adjust your search criteria.
          </Typography>
        )}
      </Grid>
    </div>
  );
};

export default BrowseJobsPage;
