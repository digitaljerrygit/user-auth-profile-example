import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import {
  TextField,
  Button,
  Stack,
  Container,
  Grid,
  Box,
  Typography,
  InputAdornment,
  Input,
  IconButton,
} from "@mui/material";

export default function Signup() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Required";
    }

    if (!values.firstName) {
      errors.firstName = "Required";
    }

    if (!values.lastName) {
      errors.lastName = "Required";
    }

    if (!values.email) {
      errors.email = "Required";
    }

    if (!values.password) {
      errors.password = "Required";
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/.test(values.password)
    ) {
      errors.password = true;
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validate,
    validateOnChange: false,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            navigate("/dashboard");
          }
        });
    },
  });

  useEffect(() => {
    fetch("http://localhost:3001/current-user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setAuthenticated(res.authenticated);
      });
  }, []);

  if (authenticated) {
    navigate("/dashboard");
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack
        spacing={2}
        alignItems="start"
        justifyContent="center"
        height="100vh"
        sx={{ maxWidth: "sm" }}
        m={(0, "auto")}
      >
        {/* USERNAME */}
        <Typography variant="h6">Signup Here</Typography>
        <Typography variant="body2">
          Data entered will be stored in a MySQL database. However, I will not
          be hoarding it. This is a real live registration form. Also anything
          you didn't opt in to enter will not be stored.
        </Typography>
        <TextField
          fullWidth
          type="text"
          label="Username"
          name="username"
          error={formik.errors.username}
          helperText={formik.errors.username}
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        {/* FIRST NAME */}
        <Stack direction="row" spacing={2} width="100%">
          <TextField
            fullWidth
            type="text"
            label="First Name"
            name="firstName"
            error={formik.errors.firstName}
            helperText={formik.errors.firstName}
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          {/* LAST NAME */}
          <TextField
            fullWidth
            type="text"
            label="Last Name"
            name="lastName"
            error={formik.errors.lastName}
            helperText={formik.errors.lastName}
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
        </Stack>
        {/* EMAIL */}
        <TextField
          fullWidth
          type="email"
          label="Email"
          name="email"
          error={formik.errors.email}
          helperText={formik.errors.email}
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {/* PASSWORD */}
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          error={formik.errors.password}
          helperText="Password should be 8 to 12 characters long and should contain at least one uppercase letter, one lowercase letter and one number"
          value={formik.values.password}
          onChange={formik.handleChange}
        />

        {/* SUBMIT */}
        <Button type="submit" fullWidth={true} variant="contained">
          Submit
        </Button>
        <Button
          type="submit"
          fullWidth={true}
          variant="outlined"
          onClick={() => navigate("/login")}
        >
          Log In Instead
        </Button>
      </Stack>
    </form>
  );
}
