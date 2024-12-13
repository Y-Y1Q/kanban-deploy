import { Box, Typography } from "@mui/material";
import { ResponsiveSankey } from "@nivo/sankey";

import JobStatus from "../../../constants/job_status_values";
import { useFetchJobStats } from "./use_fetch";

export function SankeyChart() {
  const { data } = useFetchJobStats();

  if (!data) {
    return <Typography>Loading...</Typography>;
  }

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

  // Map JobStatus to colors
  const statusColors = {
    Interested: JobStatus.Interested.getColor(),
    Pending: JobStatus.Pending.getColor(),
    "In Progress": JobStatus.InProgress.getColor(),
    Offer: JobStatus.Offer.getColor(),
    Declined: JobStatus.Declined.getColor(),
    Ghosted: JobStatus.Ghosted.getColor(),
    "Follow Up": JobStatus.FollowUp.getColor(),
    Applied: "#d3a1ed",
    Interview: JobStatus.InProgress.getColor(),
    Total: "#a1d1ed",
  };

  // Prepare nodes including Total, Applied, and Interview
  const nodes = [
    { id: "Interested", color: statusColors.Interested },
    { id: "Pending", color: statusColors.Pending },
    { id: "In Progress", color: statusColors["In Progress"] },
    { id: "Offer", color: statusColors.Offer },
    { id: "Declined", color: statusColors.Declined },
    { id: "Ghosted", color: statusColors.Ghosted },
    { id: "Follow Up", color: statusColors["Follow Up"] },
    { id: "Applied", color: statusColors.Applied },
    { id: "Interview", color: statusColors.Interview },
    { id: "Total", color: statusColors.Total },
  ];

  // Prepare links with additional connections for Applied, Interview, and Total
  const links = [
    { source: "Total", target: "Applied", value: data.applied },
    { source: "Total", target: "Interested", value: data.interested },
    { source: "Applied", target: "Declined", value: data.declined },
    { source: "Applied", target: "Ghosted", value: data.ghosted },
    { source: "Applied", target: "Pending", value: data.pending },
    { source: "Applied", target: "Interview", value: data.interview },
    { source: "Interview", target: "In Progress", value: data.in_progress },
    { source: "Interview", target: "Offer", value: data.offer },
    { source: "Interview", target: "Follow Up", value: data.follow_up },
  ];

  return (
    <Box height="100%" width="90%" ml={10}>
      <ResponsiveSankey
        data={{ nodes, links }}
        margin={{ top: 40, right: 160, bottom: 40, left: 0 }}
        align="justify"
        colors={(d) => statusColors[d.id as keyof typeof statusColors]}
        nodeOpacity={1}
        nodeThickness={18}
        nodeInnerPadding={3}
        nodeSpacing={24}
        nodeBorderWidth={0}
        linkOpacity={0.5}
        linkHoverOthersOpacity={0.1}
        enableLinkGradient={true}
        label={(node) => `${node.id}: ${node.value}`}
        labelPosition="inside"
        labelOrientation="horizontal"
        labelPadding={16}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.4]] }}
        animate={true}
        theme={{
          legends: {
            text: { fontSize: 20 },
          },
          labels: {
            text: { fontSize: 20, fontWeight: "bold" },
          },
        }}
      />
    </Box>
  );
}

export default SankeyChart;
