import { Theme } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";

import Layout from "../components/layout/Layout";
import { ColorModeContextType } from "../theme";
import AiResumePage from "./ai_resume/AiResumePage";
import ContactsPage from "./contacts/ContactsPage";
import InterviewPrepPage from "./interview_prep/InterviewPrepPage";
import JobKanban from "./job_kanban/JobKanban";
import TestJobsPage from "./job_kanban/backup_job_page/JobsPage";
import TestJobComp from "./job_kanban/test_job_components/TestJobPage";
import * as JobStatsPage from "./job_stats";
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
    <Routes>
      {/* Wrap only the valid routes with Layout */}
      <Route element={<Layout theme={theme} colorMode={colorMode} />}>
        <Route path="/" element={<JobKanban />} />
        <Route path="/stats-heatmap" element={<JobStatsPage.HeatMap />} />
        <Route path="/stats-bar" element={<JobStatsPage.Bar />} />
        <Route path="/stats-donut" element={<JobStatsPage.Donut />} />
        <Route path="/stats-sankey" element={<JobStatsPage.Sankey />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/ai-resume" element={<AiResumePage />} />
        <Route path="/ai-interview" element={<InterviewPrepPage />} />

        {/* Test Routes, not displayed on sidebar */}
        <Route path="/test" element={<TestJobsPage />} />
        <Route path="/test-comp" element={<TestJobComp />} />
        <Route path="/test-data" element={<TestJobsData />} />
        <Route path="/search-company" element={<TestSearchCompany />} />
        <Route path="/search-type" element={<TestSearchType />} />
      </Route>

      {/* Catch-all for invalid paths without Layout styling */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default LayoutRoutes;
