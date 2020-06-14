import {
  useMediaQuery,
  useTheme,
  Grid,
  Card,
  Typography,
} from '@material-ui/core'
import Notes from '@material-ui/icons/Notes'
import Timeline from '@material-ui/icons/Timeline'
import React from 'react'
import Footer from '../components/footer/Footer'
import Layout from '../components/layout/layout'
import { EmptyMsg } from '../components/message/EmptyMsg'
import { Wrapper } from '../components/wrapper/wrapper'
import useStyles from '../components/styles/useStyles'

export default function Dashboard() {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  })
  const classes = useStyles({})

  return (
    <Layout module="Dashboard">
      <Wrapper>
        <div style={{ marginTop: '12px' }}>
          <Grid
            container
            justify="flex-start"
            style={{ padding: '6px', textAlign: 'center' }}
          >
            <Grid item xs={6} md={4} lg={3}>
              <Card variant="outlined" className={classes.card}>
                <Notes />
                <Typography variant="h6" color="primary">
                  Total Workouts Plan
                </Typography>
                <Typography variant="h6" color="secondary">
                  0
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} md={4} lg={3}>
              <Card variant="outlined" className={classes.card}>
                <Timeline />
                <Typography variant="h6" color="primary">
                  Body Weight
                </Typography>
                <Typography variant="h6" color="secondary">
                  0 kg
                </Typography>
              </Card>
            </Grid>
            {/* <Grid item xs={6} md={4} lg={3}>
              <Card variant="outlined" className={classes.card}>
                <Notes />
                <Typography variant="h6" color="primary">
                  Body Weight
                </Typography>
                <Typography variant="h6" color="secondary">
                  0 kg
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} md={4} lg={3}>
              <Card variant="outlined" className={classes.card}>
                <Notes />
                <Typography variant="h6" color="primary">
                  Body Weight
                </Typography>
                <Typography variant="h6" color="secondary">
                  0 kg
                </Typography>
              </Card>
            </Grid> */}
          </Grid>
        </div>
        {/* <EmptyMsg title={'Coming Soon'} /> */}
        {isDesktop === false ? <Footer /> : null}
      </Wrapper>
    </Layout>
  )
}
