import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import * as Yup from "yup";

import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { toast } from "react-toastify";

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

// const API_URL = "https://interview-ken8.vercel.app";
const API_URL = "http://localhost:8080";

const EditDetailsForm = () => {
  const theme = useTheme();
  const data = useLoaderData();

  const { userData } = data;
  const [category1, category2, category3] = data.data;

  const formik = useFormik({
    initialValues: {
      name: userData[0].firstName,
      selectors: [],
      terms: false,
    },

    onSubmit: async (values) => {
      const posting = axios.patch(`${API_URL}/user/update/details/3`, {
        name: values.name,
        agreed: values.terms,
        selectors: values.selectors,
      });
      toast.promise(posting, {
        pending: "Updating....",
        success: "Updated successfull",
        error: "Not saved error occupied",
      });
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(50, "Must be 15 characters or less")
        .min(2, "Must contain atleast two characters")
        .required("*Required"),
      selectors: Yup.array().min(1, "Select Atleast One Selector").required(),
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
          multiple
          value={formik.values.selectors}
          onChange={formik.handleChange}
          id="selectors"
          name="selectors"
          label="selectors"
        >
          <ListSubheader>{category1.name}</ListSubheader>
          {category1.departments.map(({ id, name, products }) => (
            <MenuItem value={name} key={id}>
              {name}
            </MenuItem>
          ))}

          <ListSubheader>{category2.name}</ListSubheader>
          {category2.departments.map(({ id, name, products }) => (
            <MenuItem value={name} key={id}>
              {name}
            </MenuItem>
          ))}
          <ListSubheader>{category3.name}</ListSubheader>
          {category3.departments.map(({ id, name }) => (
            <MenuItem value={name} key={id}>
              {name}
            </MenuItem>
          ))}
        </Select>

        <FormHelperText>
          {Boolean(formik.errors.selectors) && formik.errors.selectors}
        </FormHelperText>
      </FormControl>

      <Stack spacing={2} direction="row" justifyContent="center" sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" endIcon={<SaveIcon />}>
          Update
        </Button>
        <Button
          component={Link}
          to="/"
          variant="outlined"
          color="info"
          endIcon={<SaveIcon />}
        >
          Back
        </Button>
      </Stack>
    </form>
  );
};

const ViewsPage = () => {
  return (
    <Grid container>
      <EditDetailsForm />
    </Grid>
  );
};

export default ViewsPage;

export async function loader({ params }) {
  const res = await fetch(`${API_URL}/user/data/${params.userId}`);
  if (res.status === 500) {
    throw new Response("Not Found", { status: 404 });
  }

  return res.json();
}
