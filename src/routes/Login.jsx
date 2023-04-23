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

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/current-user", {
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

  const validate = (values) => {
    const errors = {};

    if (!values.username) {
      errors.username = "Required";
    }

    if (!values.password) {
      errors.password = "Required";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    validateOnChange: false,
    onSubmit: (values) => {
      fetch("/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.authenticated) {
            navigate("/dashboard");
          }
        });
    },
  });

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
        <Typography variant="h6">Login Here</Typography>
        <Typography>
          Username: <em>testing</em> / Password: <em>testing</em>
        </Typography>
        <Typography variant="body2">
          Use the pre-configured account to test things out. You can also create
          your own account. Data is stored in a MySQL server so it is
          persistent. Or server memory. Either way I won't be saving (long
          term). This is real authentication. No logging
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
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          error={formik.errors.password}
          helperText={formik.errors.password}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Button type="submit" fullWidth={true} variant="contained">
          Submit
        </Button>
        <Button
          type="button"
          fullWidth={true}
          variant="outlined"
          onClick={() => {
            navigate("/signup");
          }}
        >
          Create An Account
        </Button>
      </Stack>
    </form>
  );
}
