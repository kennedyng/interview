import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const theme = createTheme({
  palette: {
    primary: {
      main: red[400],
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
