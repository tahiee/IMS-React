import React, { useEffect, useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { loginUser, signUpUser } from "../firebase/firebasemethod.js";

import backgroundVideo1 from "../../img/8bd7760b-30da-4964-b8bf-75089cb53938.mp4";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="ruk">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();
export default function SignInSide() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    // signUpUser({
    //   email: data.get('email'),
    //   password: data.get('password'),
    //   type: 'students'
    // }).then((res) => {
    //   console.log(res);
    // }).catch((error) => {
    //   console.log(error);
    // })

    loginUser({
      email: data.get("email"),
      password: data.get("password"),
    })
      .then((res) => {
        if (res.type === "students") {
          console.log(res.type, "ok hai");
          navigate("/student");
          alert("Student Login Successfully");
        } else {
          navigate("/admin");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("please Check your Email & Password 2");
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ width: "100%", height: "91vh", position: "relative" }}
      >
        <CssBaseline />
        {/* Video */}
        <Grid item xs={-12} sm={4} md={7} sx={{ position: "relative" }}>
          <video
            autoPlay
            loop
            muted
            style={{ width: "100%", height: "92vh", objectFit: "cover" }}
          >
            <source src={backgroundVideo1} type="video/mp4" />
          </video>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          elevation={6}
          square
          sx={{
            zIndex: 1,
            position: "relative",
            backgroundColor: "rgba(255, 255, 255, 0.7)", // Adjust opacity as needed
            padding: 4, // Adjust padding as needed
          }}
        >

          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={"tahir@gmail.com"}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={"tahir123"}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                // onClick={GotoLogin}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
