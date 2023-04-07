import {
  Button,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  ListSubheader,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Field, useFormik } from "formik";
import SaveIcon from "@mui/icons-material/Save";
import { sxMainContent, sxPaper } from "./styles";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
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

const API_URL = "https://interview-ken8.vercel.app";

const DetailsForm = () => {
  const data = useLoaderData();
  const [category1, category2, category3] = data;
  const navigate = useNavigate();

  const theme = useTheme();

  const [openTextField, setOpenTextfield] = useState(false);

  const handleToggleTextField = () => {
    setOpenTextfield(!openTextField);
  };

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
      selectors: Yup.array().min(1, "Select Atleast One Selector").required(),
      terms: Yup.boolean().oneOf([true]),
    }),
  });

  const userIdFormik = useFormik({
    initialValues: {
      userId: "",
    },
    onSubmit: (values) => {
      navigate(`/views/user/edit/${values.userId}`);
    },
    validationSchema: Yup.object({
      userId: Yup.number()
        .min(1, "Must be greater than 1")
        .required("*Required"),
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
      <FormControlLabel
        name="terms"
        id="terms"
        sx={{
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

      <Collapse in={openTextField}>
        <Stack direction="row" alignItems="baseline" spacing={2}>
          <TextField
            id="userId"
            label="Enter your user id"
            name="userId"
            type="number"
            margin="dense"
            variant="standard"
            value={userIdFormik.values.userId}
            onChange={userIdFormik.handleChange}
            onBlur={userIdFormik.handleBlur}
            error={
              Boolean(userIdFormik.touched.userId) &&
              Boolean(userIdFormik.errors.userId)
            }
            helperText={
              Boolean(userIdFormik.errors.name) && userIdFormik.errors.name
            }
          />
          {openTextField && (
            <IconButton
              onClick={() => {
                userIdFormik.handleReset();
                handleToggleTextField();
              }}
            >
              <HighlightOffIcon />
            </IconButton>
          )}
        </Stack>
      </Collapse>

      <Stack sx={{ mt: 2 }} spacing={2} direction="row" justifyContent="center">
        <Button
          onClick={formik.handleSubmit}
          variant="contained"
          endIcon={<SaveIcon />}
        >
          Save
        </Button>
        <Button
          onClick={
            !openTextField ? handleToggleTextField : userIdFormik.handleSubmit
          }
          component={Link}
          to="#"
          variant="outlined"
          color="info"
          endIcon={<SaveIcon />}
        >
          Edit
        </Button>
      </Stack>
    </form>
  );
};

export const TermsPage = () => {
  const theme = useTheme();

  return (
    <>
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
        Please enter your name and pick the Sectors you are currently involved
        in
      </Typography>

      <DetailsForm />
    </>
  );
};

export async function loader() {
  const res = await fetch(`${API_URL}/data`);
  if (res.status === 500) {
    throw new Response("Not Found", { status: 404 });
  }

  return res.json();
}
