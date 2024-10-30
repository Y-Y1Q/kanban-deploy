import { Box } from "@mui/material";

import PageIntro from "../../components/ui/PageIntro";
import DonutChart from "./components/DonutChart";

export default function Donut() {
  return (
    <Box m="20px">
      <PageIntro title="Donut Chart" />
      <Box height="75vh">
        <DonutChart />
      </Box>
    </Box>
  );
}
