import { Box, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

import { Job } from "../../../types/api_data_types";
import styles from "./JobCard.module.css";
import JobDialog from "./JobDialog";

interface JobCardProps {
  job: Job;
  index: number;
  onUpdate: (jobId: number, updatedJob: any) => void;
  onDelete: (jobId: number, columnId: number) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, index, onUpdate, onDelete }) => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => setDialogOpen(true);
  const handleDialogClose = () => setDialogOpen(false);

  return (
    <Draggable draggableId={String(job.id)} index={index}>
      {(provided) => (
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            padding: "8px",
            marginBottom: "8px",
            ...provided.draggableProps.style,
          }}
          className={styles.jobCard}
          onClick={handleDialogOpen}
        >
          <Typography variant="h3">{job.company}</Typography>
          <Typography variant="h4">{job.position}</Typography>
          <Typography variant="h5">{job.location}</Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">{job.type}</Typography>
            <Typography variant="h5">{job.salary}</Typography>
          </Box>

          <JobDialog
            isOpen={isDialogOpen}
            onClose={handleDialogClose}
            job={job}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </Paper>
      )}
    </Draggable>
  );
};

export default JobCard;
