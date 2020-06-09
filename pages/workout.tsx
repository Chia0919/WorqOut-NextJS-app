import React from 'react'

import Layout from '../components/layout/layout'
import { EmptyMsg } from '../components/message/EmptyMsg'
import { Wrapper } from '../components/wrapper/wrapper'
import useStyles from '../components/styles/useStyles'
import Typography from '@material-ui/core/Typography'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Fab,
  List,
} from '@material-ui/core'
import Folder from '@material-ui/icons/Folder'
import NoteAdd from '@material-ui/icons/NoteAdd'
import NavigationIcon from '@material-ui/icons/Navigation'
export default function Workout() {
  const classes = useStyles({})

  return (
    <Layout module="Workouts">
      <Wrapper>
        <div className={classes.radiusWrapper}>
          <div
            style={{
              // textAlign: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <div
              style={{
                // flex: 1, textAlign: 'right',
                color: 'white',
              }}
            ></div>
            <Typography
              variant="h4"
              style={{
                color: 'white',
                fontWeight: 600,
                paddingTop: '15px',
                textAlign: 'center',
              }}
            >
              My Workout Plan
            </Typography>
          </div>
        </div>
        <List>
          <ListItem button dense style={{ background: '#f0f2ff' }}>
            <ListItemIcon>
              <NoteAdd />
            </ListItemIcon>
            <ListItemText
              primaryTypographyProps={{
                variant: 'h6',
                color: 'textPrimary',
                style: { fontWeight: 600 },
              }}
              primary="Build a workout plan"
              secondary={'Construct Your own personal workout plan'}
              secondaryTypographyProps={{
                variant: 'h6',
                style: { fontSize: '10px', fontWeight: 500 },
              }}
            />
          </ListItem>
        </List>
        <Fab className={classes.fab}>
          <NoteAdd />
        </Fab>
      </Wrapper>
    </Layout>
  )
}
