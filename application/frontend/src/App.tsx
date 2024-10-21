import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AboutUs from "./pages/About/AboutUs";
import AboutL from "./pages/About/L";
import AboutLuai from "./pages/About/Luai";
import AboutRishita from "./pages/About/Rishita";
import AboutYee from "./pages/About/Yee";
import AboutZaw from "./pages/About/Zaw";
import HomePage from "./pages/Home/HomePage";
import NotFound404 from "./pages/NotFound/NotFound404";

export default function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />

          {/* Route for the team section */}
          <Route path="/about-us" element={<AboutUs />} />

          {/* Routes for each team member's profile */}
          <Route path="/about/rishita" element={<AboutRishita />} />
          <Route path="/about/luai" element={<AboutLuai />} />
          <Route path="/about/l" element={<AboutL />} />
          <Route path="/about/zaw" element={<AboutZaw />} />
          <Route path="/about/yee" element={<AboutYee />} />

          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
