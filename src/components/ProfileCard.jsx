import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Stack, TextField } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { Edit } from "@mui/icons-material";

export default function ProfileCard({
  // username,
  // firstName,
  // lastName,
  // email,
  onClick,
  // publicId,
}) {
  const [editing, setEditing] = useState({
    username: false,
    name: false,
    email: false,
  });
  const [authenticated, setAuthenticated] = useState(false);
  const [publicId, setPublicId] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

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
          setPublicId(res.user.public_id);
        } else {
          navigate("/login");
        }
      }),
      [];
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      // firstName: "",
      // lastName: "",
      email: "",
    },
    onSubmit: (values) => {
      setEditing({
        username: false,
        name: false,
        email: false,
      });

      const entries = Object.entries(values);
      for (const [key, value] of entries) {
        if (value.length > 0) {
          console.log(key);
          fetch(`http://localhost:3001/edit/${key}/for/${publicId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              newValue: value,
            }),
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              } else if (response.status === 400) {
                alert(`Sorry the ${key} is taken`);
                console.error("Bad Request");
              } else {
                alert(`Sorry the ${key} is taken`);
                console.error("Error");
              }
            })
            .then((response) => {
              setUsername(response.user.username);
              setEmail(response.user.email);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
      formik.values.username = "";
      formik.values.email = "";
    },
  });

  return (
    <Card sx={{ maxWidth: 420 }}>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={1.5}>
            <Avatar sx={{ width: 64, height: 64 }}>{firstName[0]}</Avatar>
            <Typography gutterBottom variant="h5" component="div">
              Welcome Home, {firstName}!
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hi, I'm an example user here. My job is to let you know that I
              know how to authenticate users and display dynamic information.
            </Typography>
            {/* USERNAME */}
            {editing.username ? (
              <>
                <Typography variant="body2">Username: @{username}</Typography>
                <TextField
                  label="New username"
                  name="username"
                  type="text"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                />
                <Button type="submit" variant="contained">
                  Change
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() =>
                    setEditing({ email: false, name: false, username: false })
                  }
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Typography variant="body2">Username: @{username}</Typography>
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={() =>
                    setEditing({ email: false, name: false, username: true })
                  }
                >
                  Edit username
                </Button>
              </>
            )}
            {/* NAME */}
            {/* {editing.name ? (
              <>
                <Typography variant="body2">
                  Name: {firstName + " " + lastName}
                </Typography>
                <TextField
                  label="New First Name"
                  name="firstName"
                  type="text"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                />
                <TextField
                  label="New Last Name"
                  name="lastName"
                  type="text"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                />
                <Button variant="contained" type="submit">
                  Change
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() =>
                    setEditing({ email: false, name: false, username: false })
                  }
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Typography variant="body2">
                  Name: {firstName + " " + lastName}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={() =>
                    setEditing({ username: false, email: false, name: true })
                  }
                >
                  Edit name
                </Button>
              </>
            )} */}
            {/* EMAIL */}
            {editing.email ? (
              <>
                <Typography variant="body2">Email: {email}</Typography>
                <TextField
                  label="New Email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <Button variant="contained" type="submit">
                  Change
                </Button>
                <Button
                  color="error"
                  variant="contained"
                  onClick={() =>
                    setEditing({ email: false, name: false, username: false })
                  }
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Typography variant="body2">Email: {email}</Typography>
                <Button
                  variant="outlined"
                  startIcon={<Edit />}
                  onClick={() =>
                    setEditing({ name: false, username: false, email: true })
                  }
                >
                  Edit Email
                </Button>
              </>
            )}
          </Stack>
        </form>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={onClick}
          sx={{ ml: "auto" }}
          color="error"
          variant="contained"
        >
          Logout
        </Button>
      </CardActions>
    </Card>
  );
}
