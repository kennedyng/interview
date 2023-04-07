import { alpha } from "@mui/material";
import { red, blue, green, indigo, cyan } from "@mui/material/colors";

export const sxMainContent = {
  position: "absolute",
  height: "100vh",
  width: "100%",
  p: { xs: 0, md: 2 },
};

export const sxPaper = {
  p: 4,
  boxShadow: "5",
  "&.MuiPaper-root": {
    background: { xs: "#ffff", md: alpha("#fff", 0.4) },
  },

  width: { xs: "95%", sm: 350, md: 450 },
};
