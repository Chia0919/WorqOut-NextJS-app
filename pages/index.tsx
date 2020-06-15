import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from 'next/link'
import Head from 'next/head'
import {
  Grid,
  CssBaseline,
  Paper,
  Avatar,
  TextField,
  Button,
} from '@material-ui/core'
import useStyles from '../components/styles/useStyles'
import logo from '../assets/images/WorqOut.png'
import loginSVG from '../assets/images/login.svg'
import Layout from '../components/layout/layout'
import { useRouter } from 'next/router'
import { observer, inject } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import { initializeStore } from '../store'

const Login = (props: any) => {
  const classes = useStyles({})
  const router = useRouter()
  const [username, setUsername] = useState('')
  const { store } = props
  const handleRedirect = () => {
    router.push('/dashboard')
  }
  console.log('user', username)
  return (
    <Grid container component="main" className={classes.root}>
      <Head>
        <title>WorqOut</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <Grid item xs={12} sm={12} md={6} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={logo} alt="logo" />

          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              value={username}
              onChange={e => setUsername(e.target.value)}
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
            <Grid container>
              <Grid item xs>
                <Link href="#">Forgot password?</Link>
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => handleRedirect()}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  align="center"
                >
                  <Link href="/register">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
      <Grid item xs={false} sm={false} md={6} className={classes.image}>
        <div className={classes.svgWrapper}>
          <img src={loginSVG} alt="svg" className={classes.svg} />
        </div>
      </Grid>
    </Grid>
  )
}

export default Login
