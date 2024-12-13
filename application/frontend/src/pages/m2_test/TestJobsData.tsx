import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";

import { Job } from "../../types/api_data_types";

export default function TestJobsData() {
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Define the fetch function
    const fetchJobsData = async () => {
      try {
        const response = await axios.get("/api/jobs"); // No request body
        setJobsData(response.data.jobs); // Assuming response data is the JSON object
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.log(err.status);
          console.error(err.response);
          setError(err.response?.data?.error || "Failed to fetch jobs data");
          alert(err.response?.data?.error || "Failed to fetch jobs data");
        } else {
          console.error(err);
          alert("Failed to fetch jobs data");
        }
      }
    };

    // Fetch jobs data on component mount
    fetchJobsData();
  }, []);

  return (
    <Box
      sx={{
        width: "80%",
        maxWidth: "100vw",
        margin: "auto",
        padding: "16px",
      }}
    >
      <Typography variant="h2" gutterBottom>
        Test Page - Get Jobs Data
      </Typography>
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box
          sx={{
            border: "1px solid #ccc",
            padding: 2,
            marginTop: 2,
            height: "70vh",
            maxHeight: "100vh",
            overflowY: "scroll",
            backgroundColor: "#f4f4f4",
          }}
        >
          {jobsData.length > 0 ? (
            jobsData.map((job: Job, index: number) => (
              <Box
                key={index}
                sx={{
                  borderBottom: "1px solid #ddd",
                  padding: "10px",
                  marginBottom: "10px",
                  backgroundColor: "#fff",
                  borderRadius: "4px",
                  whiteSpace: "pre-wrap",
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Company: {job.company}
                </Typography>

                <Typography variant="h6" gutterBottom>
                  Job Position: {job.position}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {JSON.stringify(job, null, 2)}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography>No jobs found</Typography>
          )}
        </Box>
      )}
    </Box>
  );
}
