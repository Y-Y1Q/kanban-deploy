import { Box } from "@mui/material";

import PageIntro from "../../components/ui/PageIntro";
import AiResumeInput from "./components/AiResumeInput";

export default function AiResumePage() {
  return (
    <Box m="20px">
      <PageIntro title="EZ Resume Builder" />
      <Box height="75vh">
        <AiResumeInput />
      </Box>
    </Box>
  );
}
