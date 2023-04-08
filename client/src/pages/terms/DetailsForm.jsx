import {
  Button,
  Checkbox,
  Fade,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  ListSubheader,
  Menu,
  MenuItem,
  Select,
  Stack,
  TextField,
  useTheme,
} from "@mui/material";
import React from "react";
import { useFormik } from "formik";
import SaveIcon from "@mui/icons-material/Save";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useLoaderData, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
const apiUrl = import.meta.env.VITE_API_URL;

const DetailsForm = () => {
  const data = useLoaderData();
  const [category1, category2, category3] = data;
  const navigate = useNavigate();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleEditClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = () => {
    handleClose();
    navigate(`/views/user/edit/${3}`);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      selectors: [],
      terms: false,
    },

    onSubmit: async (values) => {
      const posting = axios.post(`${apiUrl}/user/create/details`, {
        name: values.name,
        agreed: values.terms,
        selectors: values.selectors,
      });
      toast.promise(
        posting,
        {
          pending: "Saving....",
          success: "Saved successfull created" + values.name,
          error: "Not saved error occupied",
        },
        { position: toast.POSITION.BOTTOM_RIGHT }
      );
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

      <Stack sx={{ mt: 2 }} spacing={2} direction="row" justifyContent="center">
        <Button
          onClick={formik.handleSubmit}
          variant="contained"
          endIcon={<SaveIcon />}
        >
          Save
        </Button>
        <Button
          onClick={handleEditClick}
          variant="contained"
          endIcon={<EditIcon />}
        >
          Edit
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleItemClick}>Profile</MenuItem>
          <MenuItem onClick={handleItemClick}>My account</MenuItem>
          <MenuItem onClick={handleItemClick}>Logout</MenuItem>
        </Menu>
      </Stack>
    </form>
  );
};
export default DetailsForm;
