import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ColorModeContext } from "../../theme";

export default function TopBar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate(); // For navigation after sign out

  const handleSignOut = async () => {
    try {
      await axios.post("/api/auth/sign-out");
      // Perform any necessary cleanup, e.g., clearing session storage, etc.
      // Redirect to login page "/"
      navigate("/");
    } catch (error) {
      console.error("Error signing out", error);
      // Handle error, e.g., show a notification
    }
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* User info */}
      <Box display="flex" sx={{ mt: 2 }}>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Welcome! &nbsp;
        </Typography>

        <Typography variant="h3" component="span" sx={{ fontWeight: "bold", color: "#4070f4" }}>
          username placeholder
        </Typography>
      </Box>

      {/* Icons */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <Box display="flex" alignItems="center">
          <IconButton onClick={handleSignOut}>
            <LogoutOutlinedIcon />
          </IconButton>
          <Typography>Sign Out</Typography>
        </Box>
      </Box>
    </Box>
  );
}
