import { Box, Typography } from "@mui/material";
import { ResponsiveCalendar } from "@nivo/calendar";

import { DateStats } from "../../../types/api_data_types";
import { useFetchDateStats } from "./use_fetch";

export default function CalendarHeatMap() {
  const { data, isLoading, error } = useFetchDateStats();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data.</div>;
  // console.log(data);

  // Render a centered message if data is null or empty
  if (!data || data.length === 0) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h1" align="center" color="textSecondary" mb="30%">
          You haven't applied to any job yet.
        </Typography>
      </Box>
    );
  }

  const heatmapData =
    data?.map((stat: DateStats) => ({
      day: stat.date_applied,
      value: stat.count,
    })) || [];

  // Determine the 'from' and 'to' dates based on heatmapData
  const from = heatmapData[0].day;
  const to = heatmapData[heatmapData.length - 1].day;

  interface TempData {
    date_applied: string;
    count: string;
  }
  const totalCount = data.reduce(
    (acc: number, item: TempData) => acc + parseInt(item.count, 10),
    0
  );

  return (
    <Box height="100%" width="90%" ml={5}>
      <Typography variant="h2" align="center" mt={10}>
        Total Jobs Applied: {totalCount}
      </Typography>

      <ResponsiveCalendar
        data={heatmapData || []}
        from={from}
        to={to}
        emptyColor="#eeeeee"
        colors={["#f4f4f4", "#ffcccb", "#ff9980", "#ff6347", "#ff4500"]}
        margin={{ top: 10, right: 40, bottom: 40, left: 40 }}
        yearSpacing={40}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-right",
            direction: "row",
            translateY: 36,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: "right-to-left",
          },
        ]}
        theme={{
          legends: {
            text: { fontSize: 20 },
          },
          labels: {
            text: { fontSize: 20 },
          },
        }}
      />
    </Box>
  );
}
