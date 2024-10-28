import { Box } from "@mui/material";

import PageIntro from "../../components/ui/PageIntro";
import BarChart from "./components/BarChart";

// import BarChart from "./components/BarChart";

export default function Bar() {
  return (
    <Box m="20px">
      <PageIntro title="Bar Chart" />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
}
