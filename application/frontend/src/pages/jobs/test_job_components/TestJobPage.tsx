import { Alert, Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { Job } from "../../../types/api_data_types";
import JobDialog from "./JobDialog";
import JobList from "./JobList";
import SearchBar from "./SearchBar";
import { deleteJob, fetchJobs } from "./test_api";

export default function TestJobComponents() {
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchJobsData = async () => {
    try {
      const jobs = await fetchJobs();
      setJobsData(jobs);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async (jobId: number) => {
    try {
      await deleteJob(jobId);
      setJobsData((prevJobsData) => prevJobsData.filter((job) => job.id !== jobId));
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchJobsData();
  }, []);

  return (
    <Box sx={{ width: "80%", margin: "auto", padding: "16px" }}>
      <Typography variant="h2" gutterBottom>
        Job Board
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpenDialog(true)}
        sx={{ marginBottom: 2 }}
      >
        Add Job
      </Button>

      <SearchBar setJobsData={setJobsData} setError={setError} />

      {error && <Alert severity="error">{error}</Alert>}

      <JobDialog open={openDialog} onClose={() => setOpenDialog(false)} onSave={fetchJobsData} />

      <JobList jobs={jobsData} onDelete={handleDelete} />
    </Box>
  );
}
