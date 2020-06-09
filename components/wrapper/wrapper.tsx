import { createStyles, Theme } from "@material-ui/core/styles";
import makeStyles from "@material-ui/styles/makeStyles";
import React from "react";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   justifyContent: "center",
      padding: "15px",
      "& .MuiSvgIcon-root": {
        color: "white",
      },
      [theme.breakpoints.down("sm")]: {
        padding: "0px",
      },
    },
  })
);
interface props {
  children: any;
}
// Move to @react-root/core-react
export function Wrapper(props: props) {
  const classes = useStyles({});
  const { children } = props;
  return <div className={classes.root}>{children}</div>;
}
