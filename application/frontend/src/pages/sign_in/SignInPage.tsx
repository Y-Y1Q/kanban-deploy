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
import { FastAverageColor } from "fast-average-color";
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const gifs = ["/img/signin.gif", "/img/signin2.gif", "/img/signin3.gif"];
  const [currentGif, setCurrentGif] = useState<string>("/img/signin2.gif");
  const [showGif, setShowGif] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setShowGif(false);

      setTimeout(() => {
        setCurrentGif((prevGif) => {
          const currentIndex = gifs.indexOf(prevGif);
          const nextIndex = (currentIndex + 1) % gifs.length;
          return gifs[nextIndex];
        });

        setShowGif(true);
      }, 1500);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [gifs]);

  const [bgColor, setBgColor] = useState<string>("transparent");

  useEffect(() => {
    const fac = new FastAverageColor();
    const img = new Image();
    img.src = currentGif;

    img.onload = () => {
      fac.getColorAsync(img).then((color: { rgba: string }) => {
        setBgColor(color.rgba);

        document.body.style.transition = "background-color 3s ease";
        document.body.style.backgroundColor = color.rgba;
      });
    };

    return () => {
      // Reset background color when the component unmounts
      document.body.style.backgroundColor = "";
    };
  }, [currentGif]);

  // Check if user is already authenticated
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

  // Input validation
  const validateUsername = (username: string) => {
    const isValid = /^[a-zA-Z0-9]{3,20}$/.test(username);
    setUsernameError(isValid ? "" : "Username must be 3-20 characters and alphanumeric.");
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
    const password = data.get("password") as string;

    if (!validateUsername(username) || !validatePassword(password)) {
      return; // Stop if any validation fails
    }

    const userData = { username, password };

    try {
      const response = await axios.post("/api/auth/sign-in", userData, { withCredentials: true });
      if (response.status === 200) {
        navigate("/app"); // Redirect on success
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log(err.status);
        console.error(err.response);
        alert(err.response?.data?.error || "Sign in failed. Please try again.");
      } else {
        console.error(err);
        alert("Sign in failed. Please try again.");
      }
    }
  };

  const handleShowPasswordToggle = () => {
    setShowPassword((prev) => !prev);
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
            backgroundColor: bgColor,
            transition: "background-color 3s ease",
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

          <img
            src={currentGif}
            alt="Changing GIF"
            style={{
              width: "690px",
              borderRadius: "15px",
              opacity: showGif ? 1 : 0,
              transition: "opacity 3s ease-in-out",
            }}
          />
        </Grid>

        {/* Right Side - Sign in Form */}
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
          <span>Test Account</span>
          <span>
            Username: <b>test</b>
          </span>
          <span>
            Password: <b>SFSUcsc648</b>
          </span>

          {/* Sign-in Form */}
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
              Sign in to use
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                onChange={(e) => validateUsername(e.target.value)}
                error={!!usernameError}
                helperText={usernameError}
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={(e) => validatePassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPasswordToggle}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>

              <Grid container>
                <Grid item>
                  <Link component={RouterLink} to="/sign-up" variant="body2">
                    {"Don't have an account? Sign Up"}
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
