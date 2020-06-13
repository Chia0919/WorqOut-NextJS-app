import { useMutation } from '@apollo/react-hooks'
import {
  Checkbox,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Select,
} from '@material-ui/core'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import FitnessCenter from '@material-ui/icons/FitnessCenter'
import Today from '@material-ui/icons/Today'
import React, { ChangeEvent, Reducer, useReducer, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ExecDialog from '../../components/dialog/ExecDialog'
import Layout from '../../components/layout/layout'
import { EmptyMsg } from '../../components/message/EmptyMsg'
import useStyles from '../../components/styles/useStyles'
import { FormWrapper, Wrapper } from '../../components/wrapper/wrapper'
import { ADD_WORKOUT_PLAN } from '../../graphql/workoutPlan'
import { IAction } from '../../helpers/common'
import daysOfWeek from '../../helpers/daysOfWeek.json'
import execJson from '../../helpers/exercisesList.json'
import { withApollo } from '../../lib/apollo'
import ExerciseArray from './ExerciseArray'
import { useRouter } from 'next/router'

interface ILocalState {
  exercises: any
  exercisesSelected: any
}
interface IAddWorkout {
  days: string
  workoutName: string
  workoutNote: string
}
function AddWorkoutForm() {
  const classes = useStyles({})
  const [open, setOpen] = useState(false)
  const [muscle, setMuscle] = useState('All')
  const router = useRouter()

  const [ExerArr, setExerArr] = useState([])
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setMuscle(event.target.value as string)
  }
  // useEffect(() => {
  //   const execData: any = exercisesList.filter(v => v.type === muscle)
  //   setExerArr(execData)
  // }, [muscle])
  // const exercisesWithChecked = exercisesList.map(el => {
  //   ;(el.checked as any) = false
  //   return el
  // })

  const initialState: ILocalState = {
    exercises: execJson,
    exercisesSelected: [],
  }
  const reducer: Reducer<ILocalState, IAction> = (state, action) => {
    switch (action.type) {
      case 'reset':
        return initialState
      default:
        return { ...state, [action.type]: action.payload }
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const getExerciseArray = state.exercisesSelected?.map(v => v)
  console.log(getExerciseArray)
  const defaultValues = {
    days: 'Monday',
    workoutName: '',
    workoutNote: '',
  }
  const { handleSubmit, register, getValues, control, watch } = useForm<
    IAddWorkout
  >({
    defaultValues,
    // validationSchema: FormSchema,
  })
  const [
    addWorkoutPlan,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(ADD_WORKOUT_PLAN, {
    onError: error => {
      console.log('ERROR', error)
    },
    onCompleted: data => {
      console.log('data', data)
    },
  })
  const onSubmit = data => {
    console.log(data)
    addWorkoutPlan({
      variables: {
        workoutInput: {
          days: data.days,
          workoutName: data.workoutName,
          workoutNote: data.workoutNote,
        },
        exerciseInput: data.getExerciseArray.map(v => {
          return {
            name: v.name,
            setInput: v.set.map(x => {
              return {
                set: parseFloat(x.set),
                kg: parseFloat(x.kg),
                rep: parseFloat(x.rep),
              }
            }),
          }
        }),
      },
    })
    router.push('/workout')
  }
  console.log(mutationError)
  const TotalExerChecked = state.exercises.filter(
    (v: any) => v.checked === true
  ).length
  const handleAddExerc = () => {
    const checkedArr = state.exercises.filter((v: any) => v.checked === true)
    dispatch({
      type: 'exercisesSelected',
      payload: checkedArr,
    })
    setOpen(false)
  }

  const handleAddSet = () => {
    alert('ADD SET +1')
  }

  console.log(state, 'here')
  return (
    <Layout module="Workouts">
      <form onSubmit={handleSubmit(onSubmit)} id="submit-form">
        <Wrapper>
          <FormWrapper header="Add Plan" onclick={() => alert('back')}>
            <Grid container justify="flex-start">
              <Grid item xs={12} md={3}>
                <Card variant="outlined" className={classes.card}>
                  <Grid container justify="flex-start">
                    <Grid
                      item
                      xs={6}
                      md={12}
                      lg={6}
                      style={{ paddingRight: '12px' }}
                    >
                      <Controller
                        as={
                          <TextField
                            id="input-with-icon-textfield"
                            label="Days"
                            required
                            fullWidth
                            select
                            margin="dense"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Today />
                                </InputAdornment>
                              ),
                            }}
                          >
                            {daysOfWeek.map((option, index) => (
                              <MenuItem key={index} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </TextField>
                        }
                        name="days"
                        fullWidth
                        control={control}
                        inputRef={register({})}
                      />
                    </Grid>
                    <Grid item xs={6} md={12} lg={6}>
                      <Controller
                        as={
                          <TextField
                            id="input-with-icon-textfield"
                            label="Workout Name"
                            required
                            fullWidth
                            margin="dense"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <FitnessCenter />
                                </InputAdornment>
                              ),
                            }}
                          />
                        }
                        name="workoutName"
                        control={control}
                        fullWidth
                        autoComplete="off"
                        inputRef={register({})}
                      />
                    </Grid>
                  </Grid>

                  <Controller
                    as={TextField}
                    name="workoutNote"
                    control={control}
                    label="Workout Note"
                    required
                    fullWidth
                    autoComplete="off"
                    margin="dense"
                    multiline
                    inputRef={register({})}
                  />
                </Card>
              </Grid>
              <Grid item xs={12} md={9}>
                <Card variant="outlined" className={classes.card}>
                  {state.exercisesSelected?.length === 0 ||
                  state.exercisesSelected === undefined ? (
                    <EmptyMsg title=" Add exercises to your workout " />
                  ) : null}
                  <div>
                    <ExerciseArray
                      {...{ control, register, getExerciseArray, getValues }}
                    />{' '}
                    {/* {state.exercisesSelected?.map((el: any) => (
                      <>
                        <div
                          style={{
                            width: '100%',
                            display: 'flex',
                            background: '#040c2c',
                            padding: '4px',
                          }}
                        >
                          <Typography
                            variant="h6"
                            style={{ fontWeight: 500, color: 'white' }}
                          >
                            {el.name}
                          </Typography>
                          <div style={{ flex: 1, textAlign: 'right' }}>
                            <Delete style={{ width: '20px', color: 'white' }} />
                          </div>
                        </div>
                        <div
                          style={{
                            background: '#f0f2ff',
                            color: '#040c2c',
                            textAlign: 'center',
                          }}
                        >
                          <Grid container justify="flex-start">
                            <Grid item xs={1}>
                              SET
                            </Grid>
                            <Grid item xs={3}></Grid>
                            <Grid item xs={3}>
                              KG
                            </Grid>
                            <Grid item xs={3}>
                              REP
                            </Grid>
                            <Grid item xs={2}></Grid>
                          </Grid>
                        </div>
                        <Grid container justify="flex-start">
                          <Grid item xs={1}>
                            1
                          </Grid>
                          <Grid item xs={3}></Grid>
                          <Grid item xs={3}>
                            <TextField
                              id="input-with-icon-textfield"
                              required
                              type="number"
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={3}>
                            <TextField
                              id="input-with-icon-textfield"
                              required
                              type="number"
                              variant="outlined"
                            />
                          </Grid>
                          <Grid item xs={2} style={{ textAlign: 'right' }}>
                            <Close style={{ height: 'none' }} />
                          </Grid>
                        </Grid>
                        <Divider variant="fullWidth" />
                        <div style={{ textAlign: 'center' }}>
                          <Button
                            color="secondary"
                            disableElevation
                            onClick={handleAddSet}
                          >
                            Add Set
                          </Button>
                        </div>
                      </>
                    ))} */}
                  </div>

                  <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    className={classes.addButton}
                    onClick={handleClickOpen}
                  >
                    Add Exercises
                  </Button>
                </Card>
              </Grid>
            </Grid>
            <ExecDialog
              open={open}
              handleClose={handleClose}
              handleAdd={handleAddExerc}
              total={TotalExerChecked}
              content={
                <>
                  <div>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      fullWidth
                      value={muscle}
                      onChange={handleChange}
                    >
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value={'Chest'}>Chest</MenuItem>
                      <MenuItem value={'Back'}>Back</MenuItem>
                      <MenuItem value={'Bicep'}>Bicep</MenuItem>
                      <MenuItem value={'Shoulder'}>Shoulder</MenuItem>
                      <MenuItem value={'Tricep'}>Tricep</MenuItem>
                      <MenuItem value={'Leg'}>Leg</MenuItem>
                    </Select>
                  </div>
                  <List>
                    {state.exercises.map((v: any, index: any) => (
                      <ListItem
                        style={{ background: 'white' }}
                        button
                        divider
                        key={index}
                      >
                        <ListItemAvatar>
                          <FitnessCenter />
                        </ListItemAvatar>
                        <ListItemText
                          primary={v.name}
                          primaryTypographyProps={{
                            variant: 'h6',
                            style: { fontSize: '12px' },
                          }}
                        />
                        <ListItemSecondaryAction>
                          <Checkbox
                            edge="end"
                            checked={state.exercises[index].checked}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              const newArr: any = state.exercises
                              let exerc = newArr[index]
                              exerc.checked = e.target.checked
                              dispatch({
                                type: 'exercises',
                                payload: newArr,
                              })
                            }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                </>
              }
            />
          </FormWrapper>
        </Wrapper>
      </form>
    </Layout>
  )
}
export default withApollo({ ssr: true })(AddWorkoutForm)
