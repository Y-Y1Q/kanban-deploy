import { Box } from "@mui/material";

import PageIntro from "../../components/ui/PageIntro";
import HeatMapChart from "./components/HeatMapChart";

export default function HeatMap() {
  return (
    <Box m="20px">
      <PageIntro title="Calendar Heat Map" />
      <Box height="75vh">
        <HeatMapChart />
      </Box>
    </Box>
  );
}
