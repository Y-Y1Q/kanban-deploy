// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Box, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import { ColorModeContext } from "../../theme";

export default function TopBar() {
  // const theme = useTheme();
  // const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate(); // For navigation after sign out
  const [username, setUsername] = useState<string | null>(null); // State to hold the username

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.post("/api/auth/user-info");
        setUsername(response.data.username); // Set the username from the response
      } catch (error) {
        console.error("Error fetching user info", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSignOut = async () => {
    try {
      await axios.post("/api/auth/sign-out");
      navigate("/"); // Redirect to login page
    } catch (error) {
      console.error("Error signing out", error);
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
          {username ? username : "Loading..."} {/* Replace with username or show loading */}
        </Typography>
      </Box>

      {/* Icons */}
      <Box display="flex">
        {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton> */}
        <Box display="flex" alignItems="center">
          <IconButton onClick={handleSignOut} size="large">
            <LogoutOutlinedIcon fontSize="large" />
          </IconButton>
          <Typography fontSize={20}>Sign Out</Typography>
        </Box>
      </Box>
    </Box>
  );
}
