import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";

import { Job } from "../../types/api_data_types";

export default function TestSearchType() {
  const [type, setType] = useState("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(`/api/jobs/type`, {
        params: { type },
      });
      setJobs(response.data.jobs);
      setError(null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log(err.status);
        console.error(err.response);
        setJobs([]);
        const errorMessage = err.response?.data?.error;
        setError(errorMessage);
        alert(errorMessage); // Display error in an alert
      } else {
        console.error(err);
        alert("Error fetching jobs data.");
      }
    }
  };

  return (
    <Box sx={{ width: "80%", maxWidth: "100vw", margin: "auto", padding: "16px" }}>
      <Typography variant="h2" gutterBottom>
        Test Page - Search Jobs By Type
      </Typography>

      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel id="job-type-label">Job Type</InputLabel>
        <Select
          labelId="job-type-label"
          value={type}
          onChange={(e) => setType(e.target.value)}
          label="Job Type"
        >
          <MenuItem value="Full-Time">Full-Time</MenuItem>
          <MenuItem value="Part-Time">Part-Time</MenuItem>
          <MenuItem value="Remote">Remote</MenuItem>
          <MenuItem value="Hybrid">Hybrid</MenuItem>
          <MenuItem value="Intern">Intern</MenuItem>
          <MenuItem value="Contract">Contract</MenuItem>
        </Select>
      </FormControl>

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
                <strong>Type:</strong> {job.type}
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
