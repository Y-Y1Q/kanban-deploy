import { Route, Routes } from "react-router-dom";

import AboutUs from "./about/AboutUs";
import AboutL from "./about/L";
import AboutLuai from "./about/Luai";
import AboutRishita from "./about/Rishita";
import AboutYee from "./about/Yee";
import AboutZaw from "./about/Zaw";
import NotFoundPage from "./not_found/NotFoundPage";
import SignIn from "./sign_in/SignInPage";
import SignUp from "./sign_up/SignUpPage";

const NoLayoutRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/about/rishita" element={<AboutRishita />} />
      <Route path="/about/luai" element={<AboutLuai />} />
      <Route path="/about/l" element={<AboutL />} />
      <Route path="/about/zaw" element={<AboutZaw />} />
      <Route path="/about/yee" element={<AboutYee />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default NoLayoutRoutes;
