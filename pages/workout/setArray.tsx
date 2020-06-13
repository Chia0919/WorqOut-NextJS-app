import React from 'react'
import { useFieldArray, Controller } from 'react-hook-form'
import Close from '@material-ui/icons/Close'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

export const SetArray = (props: any) => {
  const { nestIndex, control, register } = props
  const { fields, remove, append } = useFieldArray({
    control,
    name: `getExerciseArray[${nestIndex}].set`,
  })

  return (
    <div>
      {fields.map((item, k) => {
        console.log('set', nestIndex)
        return (
          <>
            {/* <div key={item.id} style={{ marginLeft: 20 }}>
              <label>Nested Array:</label>
              <input
                name={`getExerciseArray[${nestIndex}].set[${k}].set`}
                ref={register()}
                defaultValue={item.set}
                style={{ marginRight: '25px' }}
              />

              <input
                name={`getExerciseArray[${nestIndex}].set[${k}].kg`}
                ref={register()}
                defaultValue={item.kg}
              />
            </div> */}
            <Grid container justify="flex-start" key={item.id}>
              <Grid item xs={1}>
                {/* {k + 1} */}
                <Controller
                  as={TextField}
                  control={control}
                  name={`getExerciseArray[${nestIndex}].set[${k}].set`}
                  fullWidth
                  defaultValue={k + 1}
                  variant="outlined"
                  disabled
                  inputRef={register({})}
                  // style={{ display: 'none' }}
                />
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <Controller
                  as={TextField}
                  control={control}
                  name={`getExerciseArray[${nestIndex}].set[${k}].kg`}
                  required
                  fullWidth
                  variant="outlined"
                  inputRef={register({})}
                />
              </Grid>
              <Grid item xs={3}>
                <Controller
                  as={TextField}
                  control={control}
                  name={`getExerciseArray[${nestIndex}].set[${k}].rep`}
                  required
                  fullWidth
                  variant="outlined"
                  inputRef={register({})}
                />
              </Grid>
              <Grid item xs={2} style={{ textAlign: 'right' }}>
                <Close style={{ height: 'none' }} onClick={() => remove(k)} />
              </Grid>
            </Grid>
            <Divider variant="fullWidth" />
          </>
        )
      })}
      <div style={{ textAlign: 'center' }}>
        <Button
          color="secondary"
          disableElevation
          onClick={() =>
            append({
              set: 'set',
              kg: 'kg',
              rep: 'rep',
            })
          }
        >
          Add Set
        </Button>
      </div>
    </div>
  )
}
