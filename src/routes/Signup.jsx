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
} from "@mui/material";

export default function Signup() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  // TODO: implement validation
  const formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
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
        <TextField
          fullWidth
          type="text"
          label="Username"
          name="username"
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
            value={formik.values.firstName}
            onChange={formik.handleChange}
          />
          {/* LAST NAME */}
          <TextField
            fullWidth
            type="text"
            label="Last Name"
            name="lastName"
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
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {/* PASSWORD */}
        <TextField
          fullWidth
          type="text"
          label="Password"
          name="password"
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
