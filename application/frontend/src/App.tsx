import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import LayoutRoutes from "./pages/LayoutRoutes";
import NoLayoutRoutes from "./pages/NoLayoutRoutes";
import { useMode } from "./theme";

const ProtectedRoute = ({ element }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Call the authentication API to check if the user is authenticated
    axios
      .get("/api/auth")
      .then((response) => {
        if (response.data.authenticated) {
          setIsAuthenticated(true);
        } else {
          throw new Error("Not authenticated");
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
        alert("You are not authenticated. Redirecting to login page.");
        navigate("/");
      });
  }, [navigate]);

  if (isAuthenticated === null) {
    // Show a loading state or spinner while authentication status is being checked
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : null;
};

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <BrowserRouter>
      <Routes>
        {/* Render routes without layout */}
        <Route path="/*" element={<NoLayoutRoutes />} />

        {/* Protect /app/* routes */}
        <Route
          path="/app/*"
          element={
            <ProtectedRoute
              element={<LayoutRoutes theme={theme} colorMode={colorMode} />}
              theme={theme}
              colorMode={colorMode}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
