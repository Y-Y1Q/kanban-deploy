import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

interface AddJobDialogProps {
  isOpen: boolean;
  onClose: () => void;
  columnId: number;
  columnName: string;
  addJob: (columnId: number, newJob: any) => void;
}

const AddJobDialog: React.FC<AddJobDialogProps> = ({
  isOpen,
  onClose,
  columnId,
  columnName,
  addJob,
}) => {
  const [newJobData, setNewJobData] = useState({
    column_id: columnId,
    current_status: columnName,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewJobData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await addJob(columnId, newJobData); // Refetch the column cards after adding
      onClose();
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Job</DialogTitle>
      <DialogContent>
        <TextField
          label="Company"
          name="company"
          value={newJobData.company}
          onChange={handleChange}
          fullWidth
          required
          margin="dense"
        />
        <TextField
          label="Position"
          name="position"
          value={newJobData.position}
          onChange={handleChange}
          fullWidth
          required
          margin="dense"
        />
        <TextField
          label="Salary"
          name="salary"
          value={newJobData.salary}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Type"
          name="type"
          value={newJobData.type}
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
          value={newJobData.location}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Link"
          name="link"
          value={newJobData.link}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Description"
          name="description"
          value={newJobData.description}
          onChange={handleChange}
          multiline
          rows={3}
          fullWidth
          margin="dense"
        />
        <TextField
          label="User Note"
          name="user_note"
          value={newJobData.user_note}
          onChange={handleChange}
          multiline
          rows={2}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Date Applied"
          name="date_applied"
          type="date"
          fullWidth
          margin="normal"
          variant="standard"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          value={newJobData.date_applied}
          onChange={handleChange}
        />
        <TextField
          label="Date Scheduled"
          name="date_scheduled"
          type="date"
          fullWidth
          margin="normal"
          variant="standard"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          value={newJobData.date_scheduled}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="outlined">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddJobDialog;
