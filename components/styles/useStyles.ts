import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    padding: "100px",
    textAlign: "right",
    [theme.breakpoints.down("sm")]: {
      padding: "0px",
    },
    [theme.breakpoints.down("md")]: {
      padding: "0px",
    },
  },
  image: {
    backgroundColor: "#040C2C",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  svgWrapper: {
    padding: "0 100px",
    justifyContent: "flex-start",
    alignItems: "center",
    textAlign: "center",
    marginTop: "10rem",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  svg: {
    width: "100%",
    maxWidth: "500px",
    minWidth: "250px",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "10%",
  },
  avatar: {
    width: "230px",
    height: "90px",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    maxWidth: "400px",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#5271FF",
  },
  radiusWrapper: {
    width: "100%",
    background: "#040c2c",
    height: "20vh",
    borderBottomRightRadius: "30%",
    borderBottomLeftRadius: "30%",
    borderTop: "0",
    [theme.breakpoints.down("sm")]: {
      height: "35vh",
      borderBottomRightRadius: "20%",
      borderBottomLeftRadius: "20%",
    },
  },
  fab: {
    position: "fixed",
    bottom: "16px",
    right: "16px",
    background: "#040c2c",
  },
  card: {
    padding: "12px",
    margin: "10px",
  },
  addButton: {
    width: "100%",
    marginTop: "30px",
  },
}));
export default useStyles;
