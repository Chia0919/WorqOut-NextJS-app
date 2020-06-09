import { createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
interface DialogProps {
  open: any;
  handleClose: any;
  content: any;
  handleAdd: any;
  total: any;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {},
    dialogHeader: {
      background: "#040c2c",
      padding: "12px",
    },
    dialogContent: {
      background: "#f0f2ff",
      padding: "12px",
    },
    button: {
      background: "#5271ff",
      color: "white",
    },
  })
);
export default function ExecDialog(props: DialogProps) {
  const { open, handleClose, content, handleAdd, total } = props;
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle
          id="form-dialog-title"
          disableTypography
          className={classes.dialogHeader}
        >
          <Typography
            variant="h6"
            color="textPrimary"
            style={{ color: "white" }}
          >
            Choose Exercises
          </Typography>
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {content}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color="primary"
            variant="contained"
            className={classes.button}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAdd}
            color="primary"
            variant="contained"
            className={classes.button}
          >
            Add Exercises ({total})
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
