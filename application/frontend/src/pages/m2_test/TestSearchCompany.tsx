import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState } from "react";

import { Job } from "../../types/api_data_types";

export default function TestSearchCompany() {
  const [company, setCompany] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`/api/jobs/company`, {
        params: { company },
      });
      setJobs(response.data.jobs);
      setError(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setJobs([]);
        const errorMessage = error.response?.data?.error || "Error fetching jobs data";
        setError(errorMessage);
        alert(errorMessage); // Display error in an alert
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Box sx={{ width: "80%", maxWidth: "100vw", margin: "auto", padding: "16px" }}>
      <Typography variant="h2" gutterBottom>
        Test Page - Search Jobs By Company
      </Typography>

      <TextField
        label="Company"
        variant="outlined"
        fullWidth
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        sx={{ marginBottom: 2 }}
      />

      <Button variant="contained" color="primary" onClick={fetchJobs}>
        Search Jobs
      </Button>

      {error && <Alert severity="error">{error}</Alert>}

      {jobs.length === 0 && !error && (
        <Typography sx={{ marginTop: 2 }} variant="body1">
          No jobs found
        </Typography>
      )}

      {jobs.length > 0 && (
        <Box
          sx={{
            margin: "auto",
            padding: 2,
            marginTop: 2,
            height: "70vh",
            maxHeight: "100vh",
            overflowY: "scroll",
            border: "1px solid #ccc",
            whiteSpace: "pre-wrap",
            backgroundColor: "#f9f9f9",
          }}
        >
          {jobs.map((job, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <Typography variant="h5">
                <strong>Company:</strong> {job.company}
              </Typography>
              <Typography variant="h6">
                <strong>Position:</strong> {job.position}
              </Typography>
              <Typography variant="body2">
                <strong>Location:</strong> {job.location}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {JSON.stringify(job, null, 2)}
              </Typography>
              <hr /> {/* Separator between each job */}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
