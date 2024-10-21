import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const response = await axios.post("/api/auth/sign-up", userData, {
        withCredentials: true,
      });

      // Check if the response is in the 2xx range
      if (response.status === 200) {
        navigate("/"); // Redirect on success
      }
    } catch (err: any) {
      if (err.response) {
        // Server responded with a status other than 2xx
        alert(err.response.data?.error || "Sign up failed. Please try again.");
      } else if (err.request) {
        // No response was received from the server
        alert("No response from the server. Please try again.");
      } else {
        // Other errors (such as setting up the request)
        alert("Sign up failed. Please try again.");
      }
    }
  };

  return (
    <Container maxWidth="lg" sx={{ height: "100vh", display: "flex", alignItems: "center" }}>
      <Grid container>
        {/* Left Side - SVG */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: 4,
          }}
        >
          <img src="/img/home.svg" alt="home page" />
        </Grid>

        {/* Right Side - Sign Up Form with Text Above */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: 4,
          }}
        >
          {/* Text Above the Sign-up Form */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" component="h2" sx={{ mt: 4, color: "black" }}>
              Welcome to EZJobs
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 2, color: "black" }}>
              AI Powered Job Application Tracker
            </Typography>
          </Box>

          {/* Sign-up Form */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
              maxWidth: "400px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up for EZJobs
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  {/* Redirect to Sign In */}
                  <Link component={RouterLink} to="/" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
