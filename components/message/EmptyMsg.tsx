// Material components
import { Typography } from "@material-ui/core";
import { createStyles, Theme } from "@material-ui/core/styles";
import makeStyles from "@material-ui/styles/makeStyles";
import NoRecord from "../../assets/images/comingsoon.svg";
import React from "react";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: "center",
      padding: "15px",
    },
    vector: {
      width: 200,
      height: 150,
    },
    title: {
      fontSize: "1rem",
      fontWeight: 700,
      marginTop: "20px",
    },
    subtitle: {
      fontSize: "0.9rem",
      fontWeight: 400,
      padding: "0px 32px",
    },
  })
);
interface props {
  title: string;
  subtitle?: string;
}
// Move to @react-root/core-react
export function EmptyMsg(props: props) {
  const classes = useStyles({});
  const { title, subtitle } = props;
  return (
    <div className={classes.root} style={{ textAlign: "center" }}>
      <img src={NoRecord} alt="img" className={classes.vector} />
      <Typography
        variant="subtitle1"
        color="textPrimary"
        className={classes.title}
      >
        {title}
      </Typography>
      <Typography variant="h6" color="textPrimary">
        {subtitle}
      </Typography>
    </div>
  );
}
