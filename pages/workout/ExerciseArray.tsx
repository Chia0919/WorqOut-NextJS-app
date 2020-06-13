import React from 'react'
import { useFieldArray } from 'react-hook-form'
// import NestedArray from "./nestedFieldArray";
import Close from '@material-ui/icons/Close'
import Delete from '@material-ui/icons/Delete'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import { SetArray } from './setArray'
import { AnyNaptrRecord } from 'dns'

export default function ExerciseArray({
  control,
  register,
  getExerciseArray,
}: any) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'getExerciseArray',
  })

  return (
    <>
      {getExerciseArray.map((item: any, index: any) => {
        return (
          <>
            <div
              key={item.id}
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
                {item.name}
              </Typography>

              <input
                name={`getExerciseArray[${index}].name`}
                ref={register()}
                defaultValue={item.name}
                style={{ display: 'none' }}
              />

              <div
                style={{ flex: 1, textAlign: 'right' }}
                onClick={() => remove(index)}
              >
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
            <SetArray nestIndex={index} {...{ control, register }} />
          </>
        )
      })}
    </>
  )
}
