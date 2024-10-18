import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AboutUs from "./pages/About/AboutUs";
import AboutL from "./pages/About/L";
import AboutLuai from "./pages/About/Luai";
import AboutRishita from "./pages/About/Rishita";
import AboutYee from "./pages/About/Yee";
import AboutZaw from "./pages/About/Zaw";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the team section */}
        <Route path="/" element={<AboutUs />} />

        {/* Routes for each team member's profile */}

        <Route path="/about/rishita" element={<AboutRishita />} />
        <Route path="/about/luai" element={<AboutLuai />} />
        <Route path="/about/l" element={<AboutL />} />
        <Route path="/about/zaw" element={<AboutZaw />} />
        <Route path="/about/yee" element={<AboutYee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
