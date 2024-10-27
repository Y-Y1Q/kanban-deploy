import { CssBaseline, ThemeProvider } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

import { ColorModeContext, ColorModeContextType } from "../../theme";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

interface LayoutProps {
  theme: Theme; // MUI theme type
  colorMode: ColorModeContextType; // Color mode type from theme context
}

const Layout: React.FC<LayoutProps> = ({ theme, colorMode }) => {
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SideBar />
          <main className="content">
            <TopBar />
            <Outlet /> {/* This renders nested routes */}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Layout;
