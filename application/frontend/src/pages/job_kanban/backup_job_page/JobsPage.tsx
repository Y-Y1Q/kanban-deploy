import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import JobStatus from "../../../constants/job_status_values";
import { Job } from "../../../types/api_data_types";

export default function TestJobsPage() {
  const [jobsData, setJobsData] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchType, setSearchType] = useState<"company" | "type">("company");
  const [searchValue, setSearchValue] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [newJobData, setNewJobData] = useState({
    column_id: JobStatus.Interested.getId(),
    current_status: JobStatus.Interested.getName(),
    company: "",
    position: "",
    salary: "",
    type: "",
    location: "",
    link: "",
    description: "",
    user_note: "",
    date_applied: "",
    date_scheduled: "",
  });

  const fetchJobsData = async () => {
    try {
      const response = await axios.get("/api/jobs");
      setJobsData(response.data.jobs);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(err.response);
        setError(err.response?.data?.error || "Failed to fetch jobs data");
      } else {
        console.error(err);
        setError("Failed to fetch jobs data");
      }
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/jobs/${searchType}`, {
        params: { [searchType]: searchValue },
      });
      setJobsData(response.data.jobs);
      setError(null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Error fetching jobs data");
      } else {
        setError("Error fetching jobs data");
      }
    }
  };

  const handleSave = async () => {
    try {
      await axios.post("/api/jobs/add", {
        column_id: newJobData.column_id,
        jobData: newJobData,
      });
      setOpenDialog(false);
      fetchJobsData(); // Refresh job list after adding
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.error || "Error saving job data");
      } else {
        setError("Error saving job data");
      }
    }
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setNewJobData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDelete = async (jobId: number) => {
    try {
      await axios.delete(`/api/jobs/${jobId}`);
      setJobsData((prevJobsData) => prevJobsData.filter((job) => job.id !== Number(jobId)));
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Error deleting job data");
      } else {
        setError("Error deleting job data");
      }
    }
  };

  useEffect(() => {
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
        Job Board
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleDialogOpen}
        sx={{ marginBottom: 2 }}
      >
        Add Job
      </Button>

      {/* Search Section */}
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", marginBottom: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Search By</InputLabel>
          <Select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as "company" | "type")}
            label="Search By"
          >
            <MenuItem value="company">Company</MenuItem>
            <MenuItem value="type">Type</MenuItem>
          </Select>
        </FormControl>

        {searchType === "company" ? (
          <TextField
            label="Company"
            variant="outlined"
            fullWidth
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        ) : (
          <FormControl fullWidth>
            <InputLabel>Job Type</InputLabel>
            <Select
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
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
        )}

        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      {/* Add Job Dialog */}
      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm">
        <DialogTitle>Add New Job</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              value={newJobData.column_id}
              onChange={(e) => {
                const selectedStatus = Object.values(JobStatus).find(
                  (status) => status.getId() === Number(e.target.value)
                );
                if (selectedStatus) {
                  setNewJobData({
                    ...newJobData,
                    column_id: selectedStatus.getId(),
                    current_status: selectedStatus.getName(),
                  });
                }
              }}
            >
              {Object.values(JobStatus).map((status) => (
                <MenuItem key={status.getId()} value={status.getId()}>
                  {status.getName()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Company"
            fullWidth
            margin="normal"
            value={newJobData.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
          />
          <TextField
            label="Position"
            fullWidth
            margin="normal"
            value={newJobData.position}
            onChange={(e) => handleInputChange("position", e.target.value)}
          />
          <TextField
            label="Salary"
            fullWidth
            margin="normal"
            value={newJobData.salary}
            onChange={(e) => handleInputChange("salary", e.target.value)}
          />
          <TextField
            label="Type"
            fullWidth
            margin="normal"
            value={newJobData.type}
            onChange={(e) => handleInputChange("type", e.target.value)}
          />
          <TextField
            label="Location"
            fullWidth
            margin="normal"
            value={newJobData.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
          />
          <TextField
            label="Link"
            fullWidth
            margin="normal"
            value={newJobData.link}
            onChange={(e) => handleInputChange("link", e.target.value)}
          />
          <TextField
            label="Description"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={newJobData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
          <TextField
            label="User Note"
            fullWidth
            margin="normal"
            multiline
            rows={2}
            value={newJobData.user_note}
            onChange={(e) => handleInputChange("user_note", e.target.value)}
          />
          <TextField
            label="Date Applied"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={newJobData.date_applied}
            onChange={(e) => handleInputChange("date_applied", e.target.value)}
          />
          <TextField
            label="Date Scheduled"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={newJobData.date_scheduled}
            onChange={(e) => handleInputChange("date_scheduled", e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {error && <Alert severity="error">{error}</Alert>}

      {/* Display Job Data */}
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
              <Button
                variant="outlined"
                onClick={() => handleDelete(job.id)}
                sx={{
                  marginTop: 1,
                  color: "#F44336",
                  borderColor: "#F44336",
                  "&:hover": {
                    backgroundColor: "#D32F2F",
                    borderColor: "#D32F2F",
                    color: "#fff",
                  },
                }}
              >
                Delete
              </Button>
            </Box>
          ))
        ) : (
          <Typography>No jobs found</Typography>
        )}
      </Box>
    </Box>
  );
}
