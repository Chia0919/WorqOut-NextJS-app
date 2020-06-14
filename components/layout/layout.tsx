import Head from 'next/head'
import { useTheme } from '@material-ui/core/styles'
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import Dashboard from '@material-ui/icons/Dashboard'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import FitnessCenter from '@material-ui/icons/FitnessCenter'
import RestaurantMenu from '@material-ui/icons/RestaurantMenu'

import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import logo from '../../assets/images/worqout-logo-w.png'
import {
  Badge,
  MenuItem,
  Menu,
  makeStyles,
  Theme,
  createStyles,
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import NotificationsIcon from '@material-ui/icons/Notifications'
import Link from 'next/link'
const name = 'WorqOut'
export const siteTitle = 'WorqOut'

const drawerWidth = 240
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      background: 'white',
      '& .MuiSvgIcon-root': {
        color: '#040c2c',
      },
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      [theme.breakpoints.down('sm')]: {
        // background: '#040c2c',
        // '& .MuiSvgIcon-root': {
        //   color: 'white',
        // },
        // '& .MuiTypography-h6': {
        //   color: 'white',
        // },
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    // necessary for content to be below app bar
    toolbar: {
      minHeight: '50px',
      [theme.breakpoints.down('sm')]: {
        // display: 'none',
      },
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: '#040c2c',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        padding: '0',
      },
    },
    avatar: {
      width: '155px',
      height: '56px',
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    listItem: {
      cursor: 'pointer',
      paddingTop: '6px',
      paddingBottom: '6px',
      color: 'white',
      '& .MuiListItemIcon-root': {
        color: 'white',
      },
      '&:hover': {
        backgroundColor: '#5271ff',
        borderRight: '4px solid white',
        color: '#5271ff',
        '& .MuiListItemIcon-root': {
          color: 'white',
          marginLeft: '-4px',
        },
      },
    },
  })
)
interface LayoutProps {
  children: any
  module: string
  window?: () => Window
}
export default function Layout({ children, window, module }: LayoutProps) {
  const classes = useStyles()
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const isMenuOpen = Boolean(anchorEl)
  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  )
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const MenuList: any = [
    { label: 'Dasboard', path: '/dashboard', icon: <Dashboard /> },
    { label: 'Workouts', path: '/workout', icon: <FitnessCenter /> },
    { label: 'Food Nutrition', path: '/nutrition', icon: <RestaurantMenu /> },
  ]
  const drawer = (
    <div>
      <div className={classes.toolbar} style={{ paddingLeft: '40px' }}>
        <Avatar className={classes.avatar} src={logo} />
      </div>
      <Divider />
      <List>
        {MenuList.map((el: any, index: any) => (
          <Link href={el.path} key={index}>
            <ListItem divider button className={classes.listItem}>
              <ListItemIcon>{el.icon}</ListItemIcon>
              <ListItemText
                primary={el.label}
                primaryTypographyProps={{
                  variant: 'h6',
                  style: { color: 'white' },
                }}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  )
  const container =
    window !== undefined ? () => window().document.body : undefined
  return (
    <div className={classes.root}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="WorqOut- simple workout tracker log"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{ fontWeight: 700 }}>
            WorqOut - {module}
          </Typography>
          <div style={{ flexGrow: 1 }} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 3 new notifications" color="inherit">
              <Badge badgeContent={3} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
      {renderMenu}
    </div>
  )
}
