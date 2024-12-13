import { Button, Dialog, DialogActions, DialogContent, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";

interface JobDialogProps {
  isOpen: boolean;
  onClose: () => void;
  job: any;
  onUpdate: (jobId: number, updatedJob: any) => void;
  onDelete: (jobId: number, columnId: number) => void;
}

const JobDialog: React.FC<JobDialogProps> = ({ isOpen, onClose, job, onUpdate, onDelete }) => {
  const [jobData, setJobData] = useState({
    column_id: job.column_id,
    company: job.company,
    position: job.position,
    salary: job.salary,
    type: job.type,
    location: job.location,
    link: job.link,
    description: job.description,
    user_note: job.user_note,
    date_applied: job.date_applied,
    date_scheduled: job.date_scheduled,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    await onUpdate(job.id, jobData);
    onClose();
  };

  const handleDelete = async () => {
    await onDelete(job.id, job.column_id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <TextField
          label="Company"
          name="company"
          value={jobData.company}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />
        <TextField
          label="Position"
          name="position"
          value={jobData.position}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
        />
        <TextField
          label="Salary"
          name="salary"
          value={jobData.salary || ""}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Type"
          name="type"
          value={jobData.type || ""}
          onChange={handleChange}
          select
          fullWidth
          margin="dense"
        >
          {["Full-Time", "Part-Time", "Remote", "Hybrid", "Intern", "Contract"].map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Location"
          name="location"
          value={jobData.location || ""}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />

        <TextField
          label="Link"
          name="link"
          value={jobData.link || ""}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />

        <TextField
          label="Description"
          name="description"
          value={jobData.description || ""}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
          margin="dense"
        />
        <TextField
          label="User Note"
          name="user_note"
          value={jobData.user_note || ""}
          onChange={handleChange}
          multiline
          rows={2}
          fullWidth
          margin="dense"
        />

        <TextField
          label="Date Applied"
          name="date_applied"
          value={jobData.date_applied || ""}
          onChange={handleChange}
          type="date"
          fullWidth
          margin="normal"
          variant="standard"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <TextField
          label="Date Scheduled:"
          name="date_scheduled"
          value={jobData.date_scheduled || ""}
          onChange={handleChange}
          type="date"
          fullWidth
          margin="normal"
          variant="standard"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
        <DialogActions>
          <Button onClick={onClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" variant="outlined">
            Delete
          </Button>
          <Button onClick={handleUpdate} color="primary" variant="outlined">
            Update
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default JobDialog;
