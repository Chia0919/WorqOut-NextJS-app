import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

interface Props {
  open: boolean
  handleClose: any
  inputField: any
  mode: string
}
export default function FormDialog(props: Props) {
  const { open, handleClose, inputField, mode } = props

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Body Weight & Fat Percentage
        </DialogTitle>
        <DialogContent>{inputField}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            close
          </Button>
          <Button type="submit" form="submit-form" color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
