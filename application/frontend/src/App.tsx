import { BrowserRouter, Route, Routes } from "react-router-dom";

import LayoutRoutes from "./pages/LayoutRoutes";
import NoLayoutRoutes from "./pages/NoLayoutRoutes";
import { useMode } from "./theme";

// interface LayoutProps {
//   colorMode: ColorModeContextType; // Color mode type from theme context
// }
const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <BrowserRouter>
      <Routes>
        {/* Render routes without layout */}
        <Route path="/*" element={<NoLayoutRoutes />} />

        {/* Render routes with layout (typically prefixed by specific paths) */}
        <Route path="/app/*" element={<LayoutRoutes theme={theme} colorMode={colorMode} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
