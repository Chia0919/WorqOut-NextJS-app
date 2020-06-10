import {
  Avatar,
  Fab,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import NoteAdd from '@material-ui/icons/NoteAdd'
import Link from 'next/link'
import React from 'react'
import Layout from '../components/layout/layout'
import useStyles from '../components/styles/useStyles'
import { ContentWrapper, Wrapper } from '../components/wrapper/wrapper'
import { withApollo } from '../lib/apollo'

function Workout() {
  const classes = useStyles({})

  return (
    <Layout module="Workouts">
      <Wrapper>
        <ContentWrapper
          header="My Workout Plan"
          onclick={() => alert('back')}
        />
        <List>
          <ListItem button dense style={{ background: 'white' }}>
            <ListItemIcon>
              <Avatar>
                <NoteAdd />
              </Avatar>
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
        <Link href="/workout/add">
          <Fab className={classes.fab}>
            <NoteAdd />
          </Fab>
        </Link>
      </Wrapper>
    </Layout>
  )
}
export default withApollo({ ssr: true })(Workout)
