import { Box } from "@mui/material";

import PageIntro from "../../components/ui/PageIntro";
import SankeyChart from "./components/SankeyChart";

export default function HeatMap() {
  return (
    <Box m="20px">
      <PageIntro title="Sankey Chart" />
      <Box height="75vh">
        <SankeyChart />
      </Box>
    </Box>
  );
}
