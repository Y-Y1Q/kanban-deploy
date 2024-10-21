import { Route, Routes } from "react-router-dom";

import AboutUs from "./About/AboutUs";
import AboutL from "./About/L";
import AboutLuai from "./About/Luai";
import AboutRishita from "./About/Rishita";
import AboutYee from "./About/Yee";
import AboutZaw from "./About/Zaw";
import NotFoundPage from "./NotFound/NotFoundPage";
import SignIn from "./SignIn/SignInPage";
import SignUp from "./SignUp/SignUpPage";

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
