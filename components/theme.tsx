import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
export const primary = "#040c2c";
const secondary = "#5271ff";
// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#f2f2f2",
    },
  },
  typography: {
    fontFamily: ["Poppins", "sans-serif"].join(","),
    h1: {
      color: primary,
      fontWeight: 500,
      fontSize: "35px",
      letterSpacing: "-0.24px",
      lineHeight: "40px",
    },
    h2: {
      color: primary,
      fontWeight: 500,
      fontSize: "29px",
      letterSpacing: "-0.24px",
      lineHeight: "32px",
    },
    h3: {
      color: primary,
      fontWeight: 500,
      fontSize: "24px",
      letterSpacing: "-0.06px",
      lineHeight: "28px",
    },
    h4: {
      color: primary,
      fontWeight: 500,
      fontSize: "20px",
      letterSpacing: "-0.06px",
      lineHeight: "24px",
    },
    h5: {
      color: primary,
      fontWeight: 500,
      fontSize: "16px",
      letterSpacing: "-0.05px",
      lineHeight: "20px",
    },
    h6: {
      color: primary,
      fontWeight: 500,
      fontSize: "14px",
      letterSpacing: "-0.05px",
      lineHeight: "20px",
    },
    subtitle1: {
      color: primary,
      fontSize: "16px",
      letterSpacing: "-0.05px",
      lineHeight: "25px",
    },
  },
});

export default theme;
