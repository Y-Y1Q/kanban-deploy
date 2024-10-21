import { BrowserRouter, Route, Routes } from "react-router-dom";

import AboutUs from "./pages/About/AboutUs";
import AboutL from "./pages/About/L";
import AboutLuai from "./pages/About/Luai";
import AboutRishita from "./pages/About/Rishita";
import AboutYee from "./pages/About/Yee";
import AboutZaw from "./pages/About/Zaw";
import AiResumePage from "./pages/AiResume/AiResumePage";
import ContactsPage from "./pages/Contacts/ContacsPage";
import DocsPage from "./pages/Docs/DocsPage";
import InterviewPrepPage from "./pages/InterviewPrep/InterviewPrepPage";
import JobsPage from "./pages/Jobs/JobsPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import SignIn from "./pages/SignIn/SignInPage";
import SignUp from "./pages/SignUp/SignUpPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes for auth forms */}
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Routes for EZJobs services*/}
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/ai-resume" element={<AiResumePage />} />
        <Route path="/ai-interview" element={<InterviewPrepPage />} />

        {/* Route for the team section */}
        <Route path="/about-us" element={<AboutUs />} />

        {/* Routes for each team member's profile */}
        <Route path="/about/rishita" element={<AboutRishita />} />
        <Route path="/about/luai" element={<AboutLuai />} />
        <Route path="/about/l" element={<AboutL />} />
        <Route path="/about/zaw" element={<AboutZaw />} />
        <Route path="/about/yee" element={<AboutYee />} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
