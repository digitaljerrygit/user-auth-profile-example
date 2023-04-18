import { Container, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileCard from "../components/ProfileCard";

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("http://localhost:3001/logout", {
      method: "GET",
      credentials: "include",
    });
    setAuthenticated(false);
    navigate("/login");
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
        if (res.authenticated) {
          setUsername(res.username);
        } else {
          navigate("/login");
        }
      }),
      [];
  });

  if (!authenticated) {
    navigate("/login");
  }

  return (
    <Container>
      <Stack
        spacing={2}
        alignItems="center"
        justifyContent="center"
        height="100vh"
        m={(0, "auto")}
      >
        <ProfileCard username={username} onClick={handleLogout} />
      </Stack>
    </Container>
  );
}
