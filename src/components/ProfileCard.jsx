import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Stack } from "@mui/material";

export default function ProfileCard({
  username,
  firstName,
  lastName,
  email,
  onClick,
}) {
  return (
    <Card sx={{ maxWidth: 420 }}>
      <CardContent>
        <Stack spacing={1.5}>
          <Avatar sx={{ width: 64, height: 64 }}>{firstName[0]}</Avatar>
          <Typography gutterBottom variant="h5" component="div">
            Welcome Home, {firstName}!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Hi, I'm an example user here. My job is to let you know that I know
            how to authenticate users and display dynamic information.
          </Typography>
          <Typography variant="body2">Username: @{username}</Typography>
          <Typography variant="body2">
            Name: {firstName + " " + lastName}
          </Typography>
          <Typography variant="body2">Email: {email}</Typography>
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small">Edit Info</Button>
        <Button size="small" onClick={onClick}>
          Logout
        </Button>
      </CardActions>
    </Card>
  );
}
