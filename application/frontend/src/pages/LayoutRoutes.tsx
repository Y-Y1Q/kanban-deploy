import { Theme } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";

import Layout from "../components/layout/Layout";
import { ColorModeContextType } from "../theme";
import AiResumePage from "./AiResume/AiResumePage";
import ContactsPage from "./Contacts/ContactsPage";
import DocsPage from "./Docs/DocsPage";
import InterviewPrepPage from "./InterviewPrep/InterviewPrepPage";
import JobStatsPage from "./JobStats/JobStatsPage";
import JobsPage from "./Jobs/JobsPage";
import NotFoundPage from "./NotFound/NotFoundPage";
import TestJobsData from "./TestM2/TestJobsData";
import TestSearchCompany from "./TestM2/TestSearchCompany";
import TestSearchType from "./TestM2/TestSearchType";

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
