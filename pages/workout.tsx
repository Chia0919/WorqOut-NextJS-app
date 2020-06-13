import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  Card,
  Fab,
  Grid,
  List,
  Typography,
  useMediaQuery,
  useTheme,
  MenuItem,
  Menu,
} from '@material-ui/core'
import Add from '@material-ui/icons/Add'
import Link from 'next/link'
import React, { useState } from 'react'
import Footer from '../components/footer/Footer'
import Layout from '../components/layout/layout'
import WorkoutListItem from '../components/listItem/WorkoutListItem'
import SearchInput from '../components/search/SearchInput'
import useStyles from '../components/styles/useStyles'
import { Wrapper } from '../components/wrapper/wrapper'
import { GET_WORKOUT_PLAN, DELETE_WORKOUT_PLAN } from '../graphql/workoutPlan'
import { withApollo } from '../lib/apollo'
import { useMenuOption } from '../helpers/hooks/useMenuOption'
import ActionDialog from '../components/dialog/ActionDialog'
import { useRouter } from 'next/router'
import { EmptyMsg } from '../components/message/EmptyMsg'

function Workout() {
  const classes = useStyles({})
  const { loading, error, data } = useQuery(GET_WORKOUT_PLAN, {
    fetchPolicy: 'network-only',
    variables: {},
  })
  const router = useRouter()

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  })
  const { anchorEl, menu, handleClick, handleClose } = useMenuOption()
  const [
    deleteWorkoutPlan,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(DELETE_WORKOUT_PLAN, {
    onError: error => {
      console.log('ERROR', error)
    },
    onCompleted: data => {
      console.log('data', data)
      router.push('/workout')
    },
  })
  const handleDeleteWorkout = id => {
    deleteWorkoutPlan({
      variables: {
        id: id,
      },

      refetchQueries: [
        {
          query: GET_WORKOUT_PLAN,
        },
      ],
    })
    setOpen(false)
  }
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }
  console.log(data)
  return (
    <Layout module="Workouts Plan">
      <Wrapper>
        {/* <div className={classes.workout}></div> */}
        <Grid container justify="flex-start" className={classes.gridCard}>
          <Grid item xs={12} md={3} lg={3}>
            <Card variant="outlined" className={classes.card}>
              <Typography variant="h6">Workouts</Typography>
              <SearchInput />
            </Card>
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            <List disablePadding>
              {data?.getWorkPlan?.length === 0 ||
              data?.getWorkPlan === undefined ? (
                <Card variant="outlined" className={classes.card}>
                  <EmptyMsg
                    title="Build your personalized workout plan"
                    subtitle="Please click on the add (+) button to create a new workout plan."
                  />
                </Card>
              ) : null}
              {data?.getWorkPlan?.map((v: any, index: any) => (
                <>
                  <WorkoutListItem
                    key={index}
                    title={v.workoutName}
                    total={`Exercises: ${v.exercise.length}`}
                    subtitle={v.workoutNote}
                    days={v.days}
                    onclick={(e: React.MouseEvent<HTMLButtonElement>) =>
                      handleClick(e, v.id, index)
                    }
                  />
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={() => router.push(`/workout/${v.id}`)}>
                      View
                    </MenuItem>
                    <MenuItem>Edit</MenuItem>
                    <MenuItem onClick={() => handleClickOpen()}>
                      Delete
                    </MenuItem>
                  </Menu>
                </>
              ))}
              <ActionDialog
                open={open}
                handleClose={handleCloseDialog}
                onclick={() => handleDeleteWorkout(menu.id)}
              />
            </List>
          </Grid>
        </Grid>
        <Link href="/workout/add">
          <Fab className={classes.fab}>
            <Add style={{ color: 'white' }} />
          </Fab>
        </Link>
        {isDesktop === false ? <Footer /> : null}
      </Wrapper>
    </Layout>
  )
}
export default withApollo({ ssr: true })(Workout)
