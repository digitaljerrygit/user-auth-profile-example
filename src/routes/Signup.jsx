import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  TextField,
  Button,
  Stack,
  Container,
  Grid,
  Box,
  Typography,
} from "@mui/material";

const securityQuestions = [
  "Where were you born?",
  "What is your pet's name?",
  "Where did your parents meet?",
];

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    fetch("http://localhost:3001/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.authenticated) {
          navigate("/dashboard");
        }
      });
  };

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

  return (
    <form onSubmit={handleSubmit}>
      <Stack
        spacing={2}
        alignItems="start"
        justifyContent="center"
        height="100vh"
        sx={{ maxWidth: "sm" }}
        m={(0, "auto")}
      >
        <Typography variant="h6">Signup Here</Typography>
        <TextField
          fullWidth
          type="text"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Stack direction="row" spacing={2} width="100%">
          <TextField
            fullWidth
            type="text"
            label="First Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            type="text"
            label="Last Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Stack>
        <TextField
          fullWidth
          type="tel"
          label="Phone Number"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          type="email"
          label="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          fullWidth
          type="text"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" fullWidth={true} variant="contained">
          Submit
        </Button>
      </Stack>
    </form>
  );
}
