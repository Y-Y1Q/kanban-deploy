import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Check if the user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const response = await axios.post("/api/auth/user-info");
      if (response.data.authenticated) {
        alert("You already signed in. Redirecting...");
        navigate("/app");
      }
    };
    checkAuth();
  }, [navigate]);

  const validateUsername = (username: string) => {
    const isValid = /^[a-zA-Z0-9]{3,20}$/.test(username);
    setUsernameError(isValid ? "" : "Username must be 3-20 characters and alphanumeric.");
    return isValid;
  };

  const validateEmail = (email: string) => {
    const isValid = /\S+@\S+\.\S+/.test(email);
    setEmailError(isValid ? "" : "Please enter a valid email address.");
    return isValid;
  };

  const validatePassword = (password: string) => {
    const isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
    setPasswordError(
      isValid
        ? ""
        : "Password must be at least 8 characters, with 1 lowercase, 1 uppercase, and 1 number."
    );
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;

    if (!validateUsername(username) || !validateEmail(email) || !validatePassword(password)) {
      return; // Stop if any validation fails
    }

    const userData = { username, email, password };

    try {
      const response = await axios.post("/api/auth/sign-up", userData, { withCredentials: true });
      if (response.status === 200) {
        alert("Account created! Redirecting to login page...");
        navigate("/"); // Redirect on success
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log(err.status);
        console.error(err.response);
        alert(err.response?.data?.error || "Sign up failed. Please try again.");
      } else {
        console.error(err);
        alert("Sign up failed. Please try again.");
      }
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

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
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h3" sx={{ mt: 4, color: "black" }}>
              Welcome to <b>EZJobs</b>
            </Typography>
            <Typography variant="h5" sx={{ mt: 2, color: "black" }}>
              AI Powered Job Application Tracker
            </Typography>
          </Box>

          <img src="/img/home.svg" alt="home page" />
        </Grid>

        {/* Right Side - Sign Up Form */}
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
                error={!!usernameError}
                helperText={usernameError}
                onChange={(e) => validateUsername(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                error={!!emailError}
                helperText={emailError}
                onChange={(e) => validateEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                error={!!passwordError}
                helperText={passwordError}
                onChange={(e) => validatePassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
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
