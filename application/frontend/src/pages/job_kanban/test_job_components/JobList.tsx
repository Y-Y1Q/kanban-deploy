import { Box, Button, Typography } from "@mui/material";

interface Props {
  jobs: any[];
  onDelete: (jobId: number) => void;
}

export default function JobList({ jobs, onDelete }: Props) {
  return (
    <Box>
      {jobs.length > 0 ? (
        jobs.map((job, index) => (
          <Box key={index} sx={{ borderBottom: "1px solid #ddd", marginBottom: 2 }}>
            <Typography variant="h5">{job.company}</Typography>
            <Typography variant="subtitle1">{job.position}</Typography>
            <Button variant="outlined" color="error" onClick={() => onDelete(job.id)}>
              Delete
            </Button>
          </Box>
        ))
      ) : (
        <Typography>No jobs found</Typography>
      )}
    </Box>
  );
}
