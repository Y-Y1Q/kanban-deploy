import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import Loading from "./components/ui/Loading";
import LayoutRoutes from "./pages/LayoutRoutes";
import NoLayoutRoutes from "./pages/NoLayoutRoutes";
import { useMode } from "./theme";

interface ProtectedRouteProps {
  element: JSX.Element;
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post("/api/auth/check");
        if (response.data.authenticated) {
          setIsAuthenticated(true);
        }
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.log(err.status);
          console.error(err.response);
        } else {
          console.error(err);
        }
        setIsAuthenticated(false);
        alert("Authentication error occurred. Redirecting to login page...");
        navigate("/");
      }
    };

    checkAuth();
  }, [navigate]);

  if (isAuthenticated === null) {
    // Display the loading spinner while authentication is being checked
    return <Loading />;
  }

  return isAuthenticated ? element : null;
};

const App = () => {
  const [theme, colorMode] = useMode();

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes without layout */}
        <Route path="/*" element={<NoLayoutRoutes />} />

        {/* Protect /app/* routes, only authenticated users can access */}
        <Route
          path="/app/*"
          element={
            <ProtectedRoute element={<LayoutRoutes theme={theme} colorMode={colorMode} />} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
