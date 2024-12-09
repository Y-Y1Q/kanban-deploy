import { Box, CircularProgress, Typography } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";

import JobStatus from "../../../constants/job_status_values";
import { useFetchJobStats } from "./use_fetch";

interface ChartData {
  status: string;
  count: number;
  color: string;
  [key: string]: string | number;
}

export const JobStatsBarChart: React.FC = () => {
  const { data, isLoading, error } = useFetchJobStats();

  if (isLoading) return <CircularProgress />;
  if (error) return <Box>Error loading data</Box>;
  // Check if data exists and contains job_stats array
  if (!data) return <Box>No data available</Box>;
  // console.log(data);

  // Render a centered message if data is null or empty
  if (data.total === 0) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h1" align="center" color="textSecondary" mb="30%">
          You haven't applied to any job yet.
        </Typography>
      </Box>
    );
  }

  // Extract and transform the data to fit the chart format
  const chartData: ChartData[] = [
    {
      status: JobStatus.Interested.getName(),
      count: data.interested || 0,
      color: JobStatus.Interested.getColor(),
    },
    {
      status: JobStatus.Pending.getName(),
      count: data.pending || 0,
      color: JobStatus.Pending.getColor(),
    },
    {
      status: JobStatus.InProgress.getName(),
      count: data.in_progress || 0,
      color: JobStatus.InProgress.getColor(),
    },
    {
      status: JobStatus.Offer.getName(),
      count: data.offer || 0,
      color: JobStatus.Offer.getColor(),
    },
    {
      status: JobStatus.Declined.getName(),
      count: data.declined || 0,
      color: JobStatus.Declined.getColor(),
    },
    {
      status: JobStatus.Ghosted.getName(),
      count: data.ghosted || 0,
      color: JobStatus.Ghosted.getColor(),
    },
    {
      status: JobStatus.FollowUp.getName(),
      count: data.follow_up || 0,
      color: JobStatus.FollowUp.getColor(),
    },
  ];

  return (
    <ResponsiveBar
      data={chartData}
      keys={["count"]}
      indexBy="status"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colors={({ data }) => data.color as string}
      labelSkipWidth={12}
      labelSkipHeight={12}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Job Status",
        legendPosition: "middle",
        legendOffset: 40,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 10,
        tickRotation: 0,
        legend: "Count",
        legendPosition: "middle",
        legendOffset: -50,
        format: ">-.0f", // Ensures whole numbers on y-axis
      }}
      theme={{
        axis: {
          ticks: {
            text: { fontSize: 16 },
          },
          legend: {
            text: { fontSize: 20, fontWeight: "bold" },
          },
        },
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

export default JobStatsBarChart;
