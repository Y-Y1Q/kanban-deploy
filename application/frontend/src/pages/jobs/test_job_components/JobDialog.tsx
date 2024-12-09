import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

import { saveJob } from "./test_api";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function JobDialog({ open, onClose, onSave }: Props) {
  const [jobData, setJobData] = useState({
    company: "",
    position: "",
    type: "",
    salary: "",
  });

  const handleChange = (field: string, value: string) => {
    setJobData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    await saveJob(jobData);
    onSave();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Job</DialogTitle>
      <DialogContent>
        <TextField
          label="Company"
          fullWidth
          margin="normal"
          onChange={(e) => handleChange("company", e.target.value)}
        />
        <TextField
          label="Position"
          fullWidth
          margin="normal"
          onChange={(e) => handleChange("position", e.target.value)}
        />
        <TextField
          label="Type"
          fullWidth
          margin="normal"
          onChange={(e) => handleChange("type", e.target.value)}
        />
        <TextField
          label="Salary"
          fullWidth
          margin="normal"
          onChange={(e) => handleChange("salary", e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
