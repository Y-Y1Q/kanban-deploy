import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

import { Job } from "../../../types/api_data_types";

interface JobCardProps {
  job: Job;
  index: number;
}

const JobCard: React.FC<JobCardProps> = ({ job, index }) => {
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
        >
          <Typography variant="h3">{job.company}</Typography>
          <Typography variant="h4">{job.position}</Typography>
          <Typography variant="h5">{job.location}</Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">{job.type}</Typography>
            <Typography variant="h5">{job.salary}</Typography>
          </Box>
        </Paper>
      )}
    </Draggable>
  );
};

export default JobCard;
