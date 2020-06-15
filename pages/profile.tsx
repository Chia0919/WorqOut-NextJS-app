import { useLazyQuery, useMutation, useQuery } from '@apollo/react-hooks'
import DateFnsUtils from '@date-io/date-fns'
import {
  Avatar,
  Card,
  Grid,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment'
import Add from '@material-ui/icons/Add'
import MoreVert from '@material-ui/icons/MoreVert'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import avatar from '../assets/images/chia.jpg'
import FormDialog from '../components/dialog/FormDialog'
import UpdateDialog from '../components/dialog/UpdateDialog'
import Footer from '../components/footer/Footer'
import Layout from '../components/layout/layout'
import { EmptyMsg } from '../components/message/EmptyMsg'
import useStyles from '../components/styles/useStyles'
import FixedTabs from '../components/tab/FixedTab'
import { Wrapper } from '../components/wrapper/wrapper'
import {
  CREATE_BODY_WEIGHT,
  GET_BODY_WEIGHT,
  UPDATE_BODY_WEIGHT,
  DELETE_BODY_WEIGHT,
} from '../graphql/BodyWeight'
import { convertToMonth } from '../helpers/common'
import { useMenuOption } from '../helpers/hooks/useMenuOption'
import { withApollo } from '../lib/apollo'
import { GlobalStore } from '../store'

interface IAddBodyWeight {
  date: Date
  weight: number
  fatPercentage: number
}
interface IUpdateBodyWeight {
  updateDate: Date
  bodyWeight: number
  fatPercent: number
}
function Profile(props) {
  const store = GlobalStore()
  const router = useRouter()
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'), {
    defaultMatches: true,
  })
  const classes = useStyles({})
  const [open, setOpen] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)
  const [mode, setMode] = useState('add')
  const { anchorEl, menu, handleClick, handleClose } = useMenuOption()
  const { loading, error, data } = useQuery(GET_BODY_WEIGHT, {
    fetchPolicy: 'network-only',
    variables: {},
  })

  const [renderBodyWeight, { data: bodyWeightData }] = useLazyQuery(
    GET_BODY_WEIGHT,
    {
      variables: {
        id: menu.id,
      },
    }
  )

  useEffect(() => {
    renderBodyWeight()
    setMode('edit')
  }, [menu])

  const handleClickOpen = () => {
    setOpen(true)
    setMode('add')
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }
  const handleClickOpenUpdate = () => {
    setOpenUpdate(true)
    setMode('edit')
  }

  const handleCloseUpdateDialog = () => {
    setOpenUpdate(false)
  }
  const defaultValues = {
    date: new Date(),
    weight: 0,
    fatPercentage: 0,
  }
  const defaultUpdateValues = {
    updateDate: bodyWeightData?.getBodyWeight[0]?.date,
    bodyWeight: bodyWeightData?.getBodyWeight[0]?.weight,
    fatPercent: bodyWeightData?.getBodyWeight[0]?.fatPercentage,
  }
  const { handleSubmit, register, control } = useForm<IAddBodyWeight>({
    defaultValues: defaultValues,
  })
  const { handleSubmit: handleUpdate, register: reg, control: contr } = useForm<
    IUpdateBodyWeight
  >({
    defaultValues: defaultUpdateValues,
  })
  const [
    createBodyWeight,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_BODY_WEIGHT, {
    onError: error => {
      console.log('ERROR', error)
    },
    onCompleted: data => {
      console.log('data', data)
    },
  })
  const [
    updateBodyWeight,
    { loading: updateMutationLoading, error: updateMutationError },
  ] = useMutation(UPDATE_BODY_WEIGHT, {
    onError: error => {
      console.log('ERROR', error)
    },
    onCompleted: data => {
      console.log('data', data)
    },
  })
  const [
    deleteBodyWeight,
    { loading: deleteLoading, error: deleteMutationError },
  ] = useMutation(DELETE_BODY_WEIGHT, {
    onError: error => {
      console.log('ERROR', error)
    },
    onCompleted: data => {
      console.log('data', data)
    },
  })
  const handleDeleteWeight = id => {
    deleteBodyWeight({
      variables: {
        id: bodyWeightData?.getBodyWeight[0]?.id,
      },

      refetchQueries: [
        {
          query: GET_BODY_WEIGHT,
        },
      ],
    })
    setOpenUpdate(false)
  }
  const onSubmit = data => {
    console.log('data', data)
    mode === 'add'
      ? createBodyWeight({
          variables: {
            input: {
              date: data.date,
              weight: parseFloat(data.weight),
              fatPercentage: parseFloat(data.fatPercentage),
            },
          },
          refetchQueries: [
            {
              query: GET_BODY_WEIGHT,
            },
          ],
        })
      : updateBodyWeight({
          variables: {
            input: {
              id: bodyWeightData?.getBodyWeight[0]?.id,
              date: data.updateDate,
              weight: parseFloat(data.bodyWeight),
              fatPercentage: parseFloat(data.fatPercent),
            },
          },
          refetchQueries: [
            {
              query: GET_BODY_WEIGHT,
              variables: {
                id: bodyWeightData?.getBodyWeight[0]?.id,
              },
            },
          ],
        })
    mode === 'add' ? setOpen(false) : setOpenUpdate(false)
    router.push('/profile')
  }
  return (
    <Layout module="User Profile">
      <Wrapper>
        <div style={{ marginTop: '12px' }}>
          <Grid container justify="flex-start" className={classes.gridCard}>
            <Grid item xs={12} md={3} lg={3}>
              <Card variant="outlined" className={classes.card}>
                <div style={{ textAlign: 'center' }}>
                  <Avatar
                    alt="WorqOut"
                    src={avatar}
                    style={{
                      width: 100,
                      height: 100,
                    }}
                  />
                </div>

                <Typography
                  variant="h6"
                  color="primary"
                  style={{ display: 'flex' }}
                >
                  username:
                  <Typography
                    variant="h6"
                    color="secondary"
                    component="span"
                    style={{ paddingLeft: '4px' }}
                  >
                    {/* {store.initialState.userName} */} Chia0919
                  </Typography>
                </Typography>
                <Typography variant="h6" color="primary">
                  email:
                  <Typography
                    variant="h6"
                    color="secondary"
                    component="span"
                    style={{ paddingLeft: '4px' }}
                  >
                    {/* {store.initialState.email} */} chiapakmun0919@gmail.com
                  </Typography>
                </Typography>
                <Typography variant="h6" color="primary">
                  Last Update:
                  <Typography
                    variant="h6"
                    color="secondary"
                    component="span"
                    style={{ paddingLeft: '4px' }}
                  >
                    {convertToMonth(Date())}
                    {/* {convertToMonth(parseInt(store.initialState.lastUpdated))} */}
                  </Typography>
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={9} lg={9}>
              <Card variant="outlined" className={classes.card}>
                <FixedTabs
                  tabOne={
                    <div style={{ width: '100%' }}>
                      <Typography
                        variant="body2"
                        color="primary"
                        style={{
                          display: 'flex',
                          borderBottom: '1px solid #5271ff',
                        }}
                      >
                        History
                        <Typography
                          variant="h6"
                          color="secondary"
                          component="span"
                          style={{
                            flex: 1,
                            textAlign: 'right',
                          }}
                          onClick={handleClickOpen}
                        >
                          <Add />
                        </Typography>
                      </Typography>
                      <div>
                        {data?.getBodyWeight === undefined ||
                        data?.getBodyWeight?.length === 0 ? (
                          <EmptyMsg title={'No Data'} />
                        ) : null}
                        <List disablePadding>
                          {data?.getBodyWeight?.map((v: any, index: any) => (
                            <ListItem
                              button
                              dense
                              disableGutters
                              key={index}
                              divider
                            >
                              <ListItemText
                                primary={
                                  <Typography
                                    variant="h6"
                                    color="primary"
                                    style={{ display: 'flex' }}
                                  >
                                    {convertToMonth(v.date)}
                                    <Typography
                                      variant="h6"
                                      color="secondary"
                                      component="span"
                                      style={{ flex: 1, textAlign: 'right' }}
                                    >
                                      {v.weight} kg
                                      <Typography
                                        variant="h6"
                                        color="secondary"
                                        component="span"
                                        style={{ paddingLeft: '4px' }}
                                      >
                                        | {v.fatPercentage} %
                                      </Typography>
                                    </Typography>
                                  </Typography>
                                }
                              />
                              <ListItemSecondaryAction>
                                <IconButton
                                  aria-controls="simple-menu"
                                  aria-haspopup="true"
                                  edge="end"
                                  aria-label="arrow"
                                  onClick={(
                                    e: React.MouseEvent<HTMLButtonElement>
                                  ) => handleClick(e, v.id, index)}
                                >
                                  <MoreVert />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ))}
                          <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                            <MenuItem onClick={() => handleClickOpenUpdate()}>
                              Edit
                            </MenuItem>
                            {/* <MenuItem onClick={() => handleClickOpen()}>
                              Delete
                            </MenuItem> */}
                          </Menu>
                        </List>
                        <UpdateDialog
                          open={openUpdate}
                          mode="edit"
                          inputField={
                            <form
                              onSubmit={handleUpdate(onSubmit)}
                              id="submit-form"
                            >
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Controller
                                  as={KeyboardDatePicker}
                                  name="updateDate"
                                  label="Date"
                                  control={contr}
                                  disableToolbar
                                  defaultValue={
                                    bodyWeightData?.getBodyWeight[0]?.date
                                  }
                                  variant="inline"
                                  fullWidth
                                  format="MM/dd/yyyy"
                                  margin="normal"
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  inputRef={reg({})}
                                />
                              </MuiPickersUtilsProvider>

                              <Controller
                                as={
                                  <Input
                                    id="standard-adornment-weight"
                                    fullWidth
                                    endAdornment={
                                      <InputAdornment position="end">
                                        Kg
                                      </InputAdornment>
                                    }
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                      'aria-label': 'weight',
                                    }}
                                  />
                                }
                                name="bodyWeight"
                                control={contr}
                                defaultValue={
                                  bodyWeightData?.getBodyWeight[0]?.weight
                                }
                                fullWidth
                                autoComplete="off"
                                inputRef={reg({})}
                              />
                              <Controller
                                as={
                                  <Input
                                    id="standard-adornment-weight"
                                    fullWidth
                                    endAdornment={
                                      <InputAdornment position="end">
                                        %
                                      </InputAdornment>
                                    }
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                      'aria-label': 'weight',
                                    }}
                                  />
                                }
                                name="fatPercent"
                                defaultValue={
                                  bodyWeightData?.getBodyWeight[0]
                                    ?.fatPercentage
                                }
                                control={contr}
                                fullWidth
                                autoComplete="off"
                                inputRef={reg({})}
                              />
                            </form>
                          }
                          handleDelete={handleDeleteWeight}
                          handleClose={handleCloseUpdateDialog}
                        />
                        <FormDialog
                          open={open}
                          mode="add"
                          handleClose={handleCloseDialog}
                          inputField={
                            <form
                              onSubmit={handleSubmit(onSubmit)}
                              id="submit-form"
                            >
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Controller
                                  as={KeyboardDatePicker}
                                  name="date"
                                  label="Date"
                                  control={control}
                                  disableToolbar
                                  value={new Date()}
                                  variant="inline"
                                  fullWidth
                                  format="MM/dd/yyyy"
                                  margin="normal"
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  inputRef={register({})}
                                />
                              </MuiPickersUtilsProvider>

                              <Controller
                                as={
                                  <Input
                                    id="standard-adornment-weight"
                                    fullWidth
                                    endAdornment={
                                      <InputAdornment position="end">
                                        Kg
                                      </InputAdornment>
                                    }
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                      'aria-label': 'weight',
                                    }}
                                  />
                                }
                                name="weight"
                                control={control}
                                fullWidth
                                autoComplete="off"
                                inputRef={register({})}
                              />
                              <Controller
                                as={
                                  <Input
                                    id="standard-adornment-weight"
                                    fullWidth
                                    endAdornment={
                                      <InputAdornment position="end">
                                        %
                                      </InputAdornment>
                                    }
                                    aria-describedby="standard-weight-helper-text"
                                    inputProps={{
                                      'aria-label': 'weight',
                                    }}
                                  />
                                }
                                name="fatPercentage"
                                control={control}
                                fullWidth
                                autoComplete="off"
                                inputRef={register({})}
                              />
                            </form>
                          }
                        />
                      </div>
                    </div>
                  }
                  tabTwo={
                    <>
                      <EmptyMsg title={'Coming Soon'} />
                    </>
                  }
                />
              </Card>
            </Grid>
          </Grid>
        </div>
        {isDesktop === false ? <Footer /> : null}
      </Wrapper>
    </Layout>
  )
}
export default withApollo({ ssr: true })(Profile)
