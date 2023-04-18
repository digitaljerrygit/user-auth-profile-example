import { Container, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileCard from "../components/ProfileCard";

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
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
        console.log(res);
        setAuthenticated(res.authenticated);
        if (res.authenticated) {
          setUsername(res.user.username);
          setFirstName(res.user.firstName);
          setLastName(res.user.lastName);
          setEmail(res.user.email);
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
        <ProfileCard
          username={username}
          firstName={firstName}
          lastName={lastName}
          email={email}
          onClick={handleLogout}
        />
      </Stack>
    </Container>
  );
}
