import {
  Button,
  Checkbox,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  ListSubheader,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Field, useFormik } from "formik";
import SaveIcon from "@mui/icons-material/Save";
import { sxMainContent } from "./styles";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const API_URL = "https://interview-ken8.vercel.app";

const DetailsForm = () => {
  const data = useLoaderData();

  console.log("data", data);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      selectors: [],
      terms: false,
    },

    onSubmit: async (values) => {
      const posting = axios.post(`${API_URL}/user/create/details`, {
        name: values.name,
        agreed: values.terms,
        selectors: values.selectors,
      });
      toast.promise(posting, {
        pending: "Saving....",
        success: "Saved successfull",
        error: "Not saved error occupied",
      });
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Must be 15 characters or less")
        .min(2, "Must contain atleast two characters")
        .required("*Required"),
      selectors: Yup.array().required("Required"),
      terms: Yup.boolean().oneOf([true]),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="name"
        label="Name"
        name="name"
        margin="dense"
        variant="standard"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={Boolean(formik.touched.name) && Boolean(formik.errors.name)}
        helperText={Boolean(formik.errors.name) && formik.errors.name}
      />

      <FormControl
        fullWidth
        margin="dense"
        variant="standard"
        error={
          Boolean(formik.touched.selectors) && Boolean(formik.errors.selectors)
        }
      >
        <InputLabel id="selector-label-id">Selectors</InputLabel>
        <Select
          labelId="selector-id"
          id="selectors"
          name="selectors"
          multiple
          value={formik.values.selectors}
          onChange={formik.handleChange}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data.map(({ id, name, departments }) => (
            <MenuItem
              key={id}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>

        <FormHelperText>
          {Boolean(formik.errors.selectors) && formik.errors.selectors}
        </FormHelperText>
      </FormControl>
      <FormControlLabel
        name="terms"
        id="terms"
        sx={{
          my: 1,
          color:
            Boolean(formik.touched.terms) && Boolean(formik.errors.terms)
              ? theme.palette.error.main
              : "none",
        }}
        value={formik.values.terms}
        onChange={formik.handleChange}
        control={
          <Checkbox
            sx={{
              color:
                Boolean(formik.touched.terms) && Boolean(formik.errors.terms)
                  ? theme.palette.error.main
                  : "none",
            }}
          />
        }
        label="Agree to terms "
      />

      <Box textAlign="center">
        <Button type="submit" variant="contained" endIcon={<SaveIcon />}>
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </Box>
    </form>
  );
};

export const TermsPage = () => {
  const theme = useTheme();

  return (
    <Grid
      container
      sx={{ height: "100vh" }}
      direction={{ xs: "column-reverse", md: "column" }}
    >
      <Box sx={{ background: theme.palette.primary.main, flex: 1 }} />
      <Box sx={{ flex: 1 }} />
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        sx={sxMainContent}
      >
        <Paper sx={{ p: 4, boxShadow: "4", maxWidth: 400 }}>
          <Typography
            component={Paper}
            variant="h6"
            elevation={2}
            sx={{
              textTransform: "capitalize",
              p: 2,
              boxShadow: 1,
              background: theme.palette.primary.main,
              mb: 5,
            }}
            color="white"
            textAlign="center"
          >
            Please enter your name and pick the Sectors you are currently
            involved in
          </Typography>

          <DetailsForm />
        </Paper>
      </Grid>
    </Grid>
  );
};

export async function loader() {
  const res = await fetch(`${API_URL}/data`);
  if (res.status === 500) {
    throw new Response("Not Found", { status: 404 });
  }

  return res.json();
}
