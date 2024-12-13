import { Box } from "@mui/material";

// import PageIntro from "../../components/ui/PageIntro";
import KanbanBoard from "./components/KanbanBoard";

export default function JobKanban() {
  return (
    <Box m="20px">
      {/* <PageIntro title="Job Kanban" /> */}
      <Box height="90vh">
        <KanbanBoard />
      </Box>
    </Box>
  );
}
