import { createTheme } from "@mui/material";
import { red, blue, indigo, cyan } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: cyan[900],
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0.93rem",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "0.93rem",
        },
      },
    },
  },
});
