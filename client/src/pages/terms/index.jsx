import { Paper, Typography, useTheme } from "@mui/material";
import React from "react";
import DetailsForm from "./DetailsForm";

const apiUrl = import.meta.env.VITE_API_URL;

export const TermsPage = () => {
  const theme = useTheme();

  return (
    <>
      <Typography
        component={Paper}
        variant="body1"
        elevation={24}
        sx={{
          textTransform: "uppercase",
          fontWeight: 500,
          p: 4,
          boxShadow: 1,
          background: theme.palette.primary.main,
          mb: 5,
        }}
        color="white"
        textAlign="center"
      >
        Please enter your name and pick the Sectors you are currently involved
        in
      </Typography>
      <DetailsForm />
    </>
  );
};

export async function loader() {
  const res = await fetch(`${apiUrl}/data`);
  if (res.status === 500) {
    throw new Response("Not Found", { status: 404 });
  }

  return res.json();
}
