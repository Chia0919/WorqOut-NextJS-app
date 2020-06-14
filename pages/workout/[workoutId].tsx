import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../components/layout/layout'
import { Wrapper } from '../../components/wrapper/wrapper'
import { Card, Typography, useTheme, useMediaQuery } from '@material-ui/core'
import useStyles from '../../components/styles/useStyles'
import { GET_WORKOUT_PLAN } from '../../graphql/workoutPlan'
import { useQuery } from '@apollo/react-hooks'
import { withApollo } from '../../lib/apollo'
import Footer from '../../components/footer/Footer'
import { convertToMonth } from '../../helpers/common'

function WorkoutDetail() {
  const classes = useStyles({})
  const router = useRouter()
  const { workoutId } = router.query
  const { loading, error, data } = useQuery(GET_WORKOUT_PLAN, {
    fetchPolicy: 'network-only',
    variables: {
      id: workoutId,
    },
  })
  const workoutPlan = data?.getWorkoutPlan[0]
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  })
  console.log('data', workoutPlan)
  console.log(workoutId)
  return (
    <Layout module="Workout Details ">
      <Wrapper>
        <Card variant="outlined" className={classes.card}>
          <Typography variant="h6" color="primary" style={{ fontWeight: 600 }}>
            {workoutPlan?.workoutName}
          </Typography>
          <Typography
            variant="h6"
            color="secondary"
            style={{ fontSize: '12px', display: 'flex' }}
          >
            {workoutPlan?.days}
            <Typography
              variant="h6"
              color="primary"
              style={{ fontSize: '12px', flex: 1, textAlign: 'right' }}
            >
              Last Update :{' '}
              <Typography
                variant="h6"
                color="secondary"
                component="span"
                style={{ fontSize: '12px' }}
              >
                {convertToMonth(parseInt(workoutPlan?.modTs))}
              </Typography>
            </Typography>
          </Typography>
          <div style={{ marginTop: '10px' }}>
            <Typography
              variant="h6"
              component="span"
              color="primary"
              style={{ display: 'flex' }}
            >
              Exercise
              <Typography
                variant="h6"
                color="primary"
                style={{ fontSize: '12px', flex: 1, textAlign: 'right' }}
              >
                Best set
              </Typography>
            </Typography>
            {workoutPlan?.exercise?.map((el, index) => (
              <>
                <Typography
                  key={index}
                  variant="h6"
                  component="span"
                  color="secondary"
                  style={{ fontSize: '12px', width: '100%', display: 'flex' }}
                >
                  {el.name} x {el.set?.length}
                  <Typography
                    key={index}
                    variant="h6"
                    color="secondary"
                    style={{ fontSize: '12px', flex: 1, textAlign: 'right' }}
                  >
                    {el.set[0]?.kg} kg x {el.set[0]?.rep}
                  </Typography>
                </Typography>
              </>
            ))}
          </div>
        </Card>
        {isDesktop === false ? <Footer /> : null}
      </Wrapper>
    </Layout>
  )
}
export default withApollo({ ssr: true })(WorkoutDetail)
