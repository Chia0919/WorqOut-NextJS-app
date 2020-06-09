import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "next/link";
import Head from "next/head";
import useStyles from "../components/styles/useStyles";
import logo from "../assets/images/WorqOut.png";
import img from "../assets/images/register.svg";
import {
  Grid,
  CssBaseline,
  Paper,
  Avatar,
  TextField,
  Button,
} from "@material-ui/core";
export default function Register() {
  const classes = useStyles({});

  return (
    <Grid container component="main" className={classes.root}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={false}
        md={6}
        className={classes.image}
        style={{ backgroundColor: "#5271FF" }}
      >
        <div className={classes.svgWrapper}>
          <img src={img} alt="svg" className={classes.svg} />
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={logo} />

          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="off"
              autoFocus
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  <Link href="/">{"Already have an account? Sign in"}</Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
