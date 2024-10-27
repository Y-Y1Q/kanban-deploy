import { Theme } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";

import Layout from "../components/layout/Layout";
import { ColorModeContextType } from "../utils/theme";
import AiResumePage from "./ai_resume/AiResumePage";
import ContactsPage from "./contacts/ContactsPage";
import DocsPage from "./docs/DocsPage";
import InterviewPrepPage from "./interview_prep/InterviewPrepPage";
import JobStatsPage from "./job_stats/JobStatsPage";
import JobsPage from "./jobs/JobsPage";
import TestJobsData from "./m2_test/TestJobsData";
import TestSearchCompany from "./m2_test/TestSearchCompany";
import TestSearchType from "./m2_test/TestSearchType";
import NotFoundPage from "./not_found/NotFoundPage";

interface LayoutProps {
  theme: Theme; // MUI theme type
  colorMode: ColorModeContextType; // Color mode type from theme context
}

const LayoutRoutes: React.FC<LayoutProps> = ({ theme, colorMode }) => {
  return (
    <Layout theme={theme} colorMode={colorMode}>
      <Routes>
        {/* M2 Test page browser routes */}
        <Route path="/" element={<TestJobsData />} />
        <Route path="/search-company" element={<TestSearchCompany />} />
        <Route path="/search-type" element={<TestSearchType />} />

        {/* EZJobs service browser routes */}
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/stats" element={<JobStatsPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/ai-resume" element={<AiResumePage />} />
        <Route path="/ai-interview" element={<InterviewPrepPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
};

export default LayoutRoutes;
