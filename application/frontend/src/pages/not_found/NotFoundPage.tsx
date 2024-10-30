import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    // go back to previous page
    navigate(-1);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h1" color="textPrimary" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" color="textSecondary" paragraph>
        Page Not Found
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        Go Back
      </Button>
    </Box>
  );
}
