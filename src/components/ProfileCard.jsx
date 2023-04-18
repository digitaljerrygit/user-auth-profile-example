import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ProfileCard({ username, onClick }) {
  return (
    <Card sx={{ maxWidth: 420 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://xsgames.co/randomusers/avatar.php?g=pixel"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {username}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Hi, I'm an example user here. My job is to let you know that I know
          how to authenticate users and display dynamic information.
        </Typography>
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
