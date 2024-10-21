import { BrowserRouter, Route, Routes } from "react-router-dom";

import AboutUs from "./pages/About/AboutUs";
import AboutL from "./pages/About/L";
import AboutLuai from "./pages/About/Luai";
import AboutRishita from "./pages/About/Rishita";
import AboutYee from "./pages/About/Yee";
import AboutZaw from "./pages/About/Zaw";
import NotFoundPage from "./pages/NotFound/NotFoundPage";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />

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
