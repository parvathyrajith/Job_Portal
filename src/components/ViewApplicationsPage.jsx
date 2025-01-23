import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Container,
} from "@mui/material";
import axios from "axios";

const ViewApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        // Make the API call and assign the result to the 'response' variable
        const response = await axios.get('http://localhost:5000/api/applications');
  
        // Use the data from the response to update state
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchApplications();
    
  }, []);

  

  return (
    <Container
      maxWidth="lg"
      sx={{
        padding: "100px",
        background: "linear-gradient(135deg, #4a90e2, #1c1e21)",
        minHeight: "100vh",
        color: "#ffffff",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#ffffff",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        Job Applications
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "20px auto" }} />
      ) : applications.length > 0 ? (
        <Grid container spacing={4}>
          {applications.map((application) => (
            <Grid item xs={12} sm={6} md={4} key={application._id}>
              <Card
                sx={{
                  borderRadius: "12px",
                  boxShadow: 4,
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: 12,
                  },
                  padding: "10px",
                  backgroundColor: "#ffffff",
                  color: "#333",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {application.jobTitle}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      marginTop: "10px",
                    }}
                  >
                    <strong>Applicant:</strong> {application.fullName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      marginTop: "10px",
                    }}
                  >
                    <strong>Email:</strong> {application.email}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      marginTop: "10px",
                    }}
                  >
                    <strong>Company:</strong> {application.company}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      marginTop: "10px",
                    }}
                  >
                    <strong>Location:</strong> {application.locationName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      marginTop: "10px",
                    }}
                  >
                    <strong>Cover Letter:</strong>{" "}
                    <a
                      href={`http://localhost:5000/uploads/${application.coverLetter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: "none", color: "#007bff" }}
                    >
                      View Cover Letter
                    </a>
                  </Typography>
                </CardContent>
                <Button
                  size="small"
                  sx={{
                    color: "#fff",
                    backgroundColor: "#007bff",
                    "&:hover": {
                      backgroundColor: "#0056b3",
                    },
                    textTransform: "none",
                    margin: "10px auto",
                  }}
                  href={`http://localhost:5000/uploads/${application.resume}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography
          variant="h6"
          align="center"
          sx={{
            marginTop: "20px",
            fontStyle: "italic",
            fontWeight: 500,
          }}
        >
          No applications found.
        </Typography>
      )}
      
      
    </Container>
  );
};

export default ViewApplicationsPage;
