import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Box, Button, Container, Link, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

export default function SignIn() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
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
          <img src="/img/home.svg" alt="Sign in page" />
        </Grid>

        {/* Right Side - Sign in Form  */}
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
          M2 Test account<br></br>
          <span>
            {" "}
            Username: <b>test</b>
          </span>
          <span>
            {" "}
            Password: <b>SFSUcsc648</b>
          </span>
          {/* Text Above the Sign-in Form */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography variant="h4" component="h2" sx={{ mt: 4, color: "black" }}>
              Welcome to EZJobs
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: 2, color: "black" }}>
              AI Powered Job Application Tracker
            </Typography>
          </Box>
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
                autoComplete="username"
                autoFocus
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
                Sign In
              </Button>
              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}

                <Grid item>
                  {/* Redirect to Sign Up */}
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
