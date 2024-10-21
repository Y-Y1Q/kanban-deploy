import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";

import { ColorModeContext } from "../theme";

export default function TopBar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* User info */}
      <Box display="flex">
        <Typography variant="h5">
          Welcome,{" "}
          <Typography variant="h5" component="span" sx={{ fontWeight: "bold" }}>
            username placeholder
          </Typography>
        </Typography>
      </Box>

      {/* Icons */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <Box display="flex" alignItems="center">
          <IconButton>
            <LogoutOutlinedIcon />
          </IconButton>
          <Typography>Sign Out</Typography>
        </Box>
      </Box>
    </Box>
  );
}
