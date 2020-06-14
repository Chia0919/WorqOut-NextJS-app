import { createStyles, Theme } from '@material-ui/core/styles'
import makeStyles from '@material-ui/styles/makeStyles'
import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Close from '@material-ui/icons/Close'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   justifyContent: "center",
      padding: '15px',
      '& .MuiSvgIcon-root': {
        color: '#5271ff',
      },
      '& .MuiAvatar-colorDefault': {
        backgroundColor: '#f0f2ff',
      },
      '& .MuiIconButton-root': {
        padding: '6px',
        // [theme.breakpoints.up("sm")]: {
        //   display: "none",
        // },
      },
      [theme.breakpoints.down('sm')]: {
        padding: '0px',
      },
    },
    radiusWrapper: {
      width: '100%',
      background: '#040c2c',
      height: '20vh',
      borderBottomRightRadius: '30%',
      borderBottomLeftRadius: '30%',
      borderTop: '0',
      [theme.breakpoints.down('sm')]: {
        height: '35vh',
        borderBottomRightRadius: '20%',
        borderBottomLeftRadius: '20%',
      },
    },
    form: {
      background: '#040c2c',
      color: 'white',
      [theme.breakpoints.up('sm')]: {
        minHeight: '54px',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        top: 0,
      },
      '& .MuiOutlinedInput-input': {
        padding: '4px',
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      color: 'white',

      fontWeight: 500,
    },
    toolbar: {
      minHeight: '50px',
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  })
)
interface props {
  children: any
}
interface ContentProps {
  header: string
  onclick?: any
  children?: any
}
export function Wrapper(props: props) {
  const classes = useStyles({})
  const { children } = props
  return <div className={classes.root}>{children}</div>
}
export function ContentWrapper({ header, onclick }: ContentProps) {
  const classes = useStyles({})

  return (
    <div>
      <div
        style={{
          // textAlign: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            padding: '6px',
            color: 'white',
          }}
        >
          <IconButton
            color="inherit"
            aria-label="back"
            edge="end"
            onClick={() => onclick?.()}
          >
            <ArrowBack />
          </IconButton>
        </div>
        <Typography
          variant="h4"
          style={{
            color: 'white',
            fontWeight: 600,
            // paddingTop: '15px',
            textAlign: 'center',
          }}
        >
          {header}
        </Typography>
      </div>
    </div>
  )
}

export function FormWrapper({ header, onclick, children }: ContentProps) {
  const classes = useStyles({})
  return (
    <div className={classes.form}>
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => onclick?.()}
        >
          <Close />
        </IconButton>

        <Typography variant="h6" className={classes.title}>
          {header}
        </Typography>
        <Button color="inherit" type="submit" form="submit-form">
          Save
        </Button>
      </Toolbar>
      <main
        style={{
          background: '#f0f2ff',
          // height: "100vh",
          padding: '6px',
          flexGrow: 1,
          color: '#040c2c',
        }}
      >
        {children}
      </main>
    </div>
  )
}
