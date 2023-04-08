import React from "react";
import { Grid, Paper, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { Outlet } from "react-router-dom";
import { sxMainContent, sxPaper } from "../pages/terms/styles";

const RootLayout = () => {
  const theme = useTheme();
  return (
    <Grid
      container
      sx={{ height: "100vh" }}
      direction={{ xs: "column-reverse", md: "row-reverse" }}
    >
      <Box sx={{ background: theme.palette.primary.main, flex: 0.6 }} />
      <Box sx={{ flex: 1 }} />
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        sx={sxMainContent}
      >
        <Paper sx={sxPaper}>
          <Outlet />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default RootLayout;
