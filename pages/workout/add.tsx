import React, {
  useState,
  useEffect,
  ChangeEvent,
  useReducer,
  Reducer,
} from 'react'
import Layout from '../../components/layout/layout'
import useStyles from '../../components/styles/useStyles'
import { FormWrapper, Wrapper } from '../../components/wrapper/wrapper'
import TextField from '@material-ui/core/TextField'
import FitnessCenter from '@material-ui/icons/FitnessCenter'
import Assignment from '@material-ui/icons/Assignment'
import InputAdornment from '@material-ui/core/InputAdornment'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import MenuItem from '@material-ui/core/MenuItem'
import Today from '@material-ui/icons/Today'
import Notes from '@material-ui/icons/Notes'
import { daysOfWeeks, IAction } from '../../helpers/common'
import Button from '@material-ui/core/Button'
import { EmptyMsg } from '../../components/message/EmptyMsg'
import ExecDialog from '../../components/dialog/ExecDialog'
import execJson from '../../helpers/exercisesList.json'
import {
  Typography,
  ListItem,
  ListItemAvatar,
  Select,
  ListItemText,
  List,
  ListItemSecondaryAction,
  Checkbox,
} from '@material-ui/core'
interface IAddForm {
  exercises: any
  exercisesSelected: any
}
export default function AddForm() {
  const classes = useStyles({})
  const [open, setOpen] = useState(false)
  const [muscle, setMuscle] = useState('All')
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
  const initialState: IAddForm = {
    exercises: execJson,
    exercisesSelected: [],
  }
  const reducer: Reducer<IAddForm, IAction> = (state, action) => {
    switch (action.type) {
      case 'reset':
        return initialState
      default:
        return { ...state, [action.type]: action.payload }
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  const TotalExerChecked = state.exercises.filter(v => v.checked === true)
    .length
  const handleAddExerc = () => {
    const checkedArr = state.exercises.filter(v => v.checked === true)
    dispatch({
      type: 'exercisesSelected',
      payload: checkedArr,
    })
    setOpen(false)
  }
  console.log(state, 'here')
  return (
    <Layout module="Workouts">
      <Wrapper>
        <FormWrapper header="Add Plan" onclick={() => alert('back')}>
          <Grid container justify="flex-start">
            <Grid item xs={12} md={3}>
              <Card variant="outlined" className={classes.card}>
                <TextField
                  id="input-with-icon-textfield"
                  label="Workout Plan Name"
                  required
                  fullWidth
                  margin="dense"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Assignment />
                      </InputAdornment>
                    ),
                  }}
                />
                <Grid container justify="flex-start">
                  <Grid
                    item
                    xs={6}
                    md={12}
                    lg={6}
                    style={{ paddingRight: '12px' }}
                  >
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
                      {daysOfWeeks.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6} md={12} lg={6}>
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
                  </Grid>
                </Grid>
                <TextField
                  id="input-with-icon-textfield"
                  label="Workout Note"
                  required
                  fullWidth
                  margin="dense"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Notes />
                      </InputAdornment>
                    ),
                  }}
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
                  {state.exercisesSelected?.map(el => (
                    <p>{el.name}</p>
                  ))}
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
    </Layout>
  )
}
