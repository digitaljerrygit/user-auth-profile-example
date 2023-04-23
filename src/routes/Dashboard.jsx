import { Container, Typography, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import ProfileCard from "../components/ProfileCard";

export default function Dashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [publicId, setPublicId] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch("/api/logout", {
      method: "GET",
      credentials: "include",
    });
    setAuthenticated(false);
    navigate("/login");
  };

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
          publicId={publicId}
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
