import { CssBaseline, ThemeProvider } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { ReactNode } from "react";

import { ColorModeContext, ColorModeContextType } from "../../utils/theme";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

interface LayoutProps {
  theme: Theme; // MUI theme type
  colorMode: ColorModeContextType; // Color mode type from theme context
  children: ReactNode; // Type for children
}

const Layout: React.FC<LayoutProps> = ({ theme, colorMode, children }) => {
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <SideBar />
          <main className="content">
            <TopBar />
            {children}
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Layout;
