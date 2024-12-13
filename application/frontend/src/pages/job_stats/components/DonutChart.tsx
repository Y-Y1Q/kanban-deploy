import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ResponsivePie } from "@nivo/pie";
import React from "react";

import JobStatus from "../../../constants/job_status_values";
import { useFetchJobStats } from "./use_fetch";

const DonutChart: React.FC = () => {
  const theme = useTheme();
  const { data: jobStats, isLoading, error } = useFetchJobStats();

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading data</Typography>;

  // Render a centered message if data is null or empty
  if (jobStats.total === 0) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h1" align="center" color="textSecondary" mb="30%">
          You haven't applied to any job yet.
        </Typography>
      </Box>
    );
  }

  // Map job stats to the data format required by @nivo/pie
  const chartData = [
    {
      id: JobStatus.Interested.getName(),
      label: JobStatus.Interested.getName(),
      value: jobStats.interested,
      color: JobStatus.Interested.getColor(),
    },
    {
      id: JobStatus.Pending.getName(),
      label: JobStatus.Pending.getName(),
      value: jobStats.pending,
      color: JobStatus.Pending.getColor(),
    },
    {
      id: JobStatus.InProgress.getName(),
      label: JobStatus.InProgress.getName(),
      value: jobStats.in_progress,
      color: JobStatus.InProgress.getColor(),
    },
    {
      id: JobStatus.Offer.getName(),
      label: JobStatus.Offer.getName(),
      value: jobStats.offer,
      color: JobStatus.Offer.getColor(),
    },
    {
      id: JobStatus.Declined.getName(),
      label: JobStatus.Declined.getName(),
      value: jobStats.declined,
      color: JobStatus.Declined.getColor(),
    },
    {
      id: JobStatus.Ghosted.getName(),
      label: JobStatus.Ghosted.getName(),
      value: jobStats.ghosted,
      color: JobStatus.Ghosted.getColor(),
    },
    {
      id: JobStatus.FollowUp.getName(),
      label: JobStatus.FollowUp.getName(),
      value: jobStats.follow_up,
      color: JobStatus.FollowUp.getColor(),
    },
  ];

  return (
    <ResponsivePie
      data={chartData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      activeOuterRadiusOffset={12}
      animate={true}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={({ data }) => data.color}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={theme.palette.text.primary}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      theme={{
        legends: {
          text: { fontSize: 20 },
        },
        labels: {
          text: { fontSize: 20 },
        },
      }}
    />
  );
};

export default DonutChart;
