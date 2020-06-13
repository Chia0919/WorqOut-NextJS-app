import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { makeStyles } from '@material-ui/core/styles'
import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
import FitnessCenter from '@material-ui/icons/FitnessCenter'
import RestaurantMenu from '@material-ui/icons/RestaurantMenu'
import { useRouter } from 'next/router'
import React from 'react'

const useStyles = makeStyles({
  root: {
    width: '100%',
    bottom: '0',
    right: '0',
    left: '0',
    position: 'fixed',
    background: 'white',
    boxShadow: '0 1px 20px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  },
})

export default function Footer() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const router = useRouter()

  const navigations = [
    {
      label: 'Dashboard',
      icon: <Dashboard />,
      path: '/dashboard',
    },
    {
      label: 'Workouts',
      icon: <FitnessCenter />,
      path: '/workout',
    },
    {
      label: 'Recipes',
      icon: <RestaurantMenu />,
      path: '/recipe',
    },
    {
      label: 'Profile',
      icon: <Person />,
      path: '/profile',
    },
  ]
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
      showLabels
      className={classes.root}
    >
      {navigations.map((v, index) => (
        <BottomNavigationAction
          key={index}
          label={v.label}
          icon={v.icon}
          onClick={() => router.push(v.path)}
        />
      ))}
    </BottomNavigation>
  )
}
