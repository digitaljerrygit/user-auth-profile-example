import dotenv from "dotenv";
dotenv.config();
import express, { json, urlencoded } from "express";
const app = express();
import session from "express-session";
import { hash, compare } from "bcrypt";
import morgan from "morgan";
import { nanoid } from "nanoid";
import users from "./users.js";

// TODO: Implement editing feature

app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// GET ALL USERS
app.get("/users", (req, res) => {
  console.log(users);
  res.json(users);
});

// REGISTRATION
app.post("/signup", async (req, res) => {
  const userInDb = users.find((user) => user.username === req.body.username);
  if (userInDb) {
    return res.sendStatus(404);
  }
  const password = await hash(req.body.password, 10);
  users.push({
    public_id: nanoid(12),
    username: req.body.username,
    password: password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  });
  req.session.authenticated = true;
  req.session.user = {
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };
  res.json(req.session.user);
});

// LOGIN
app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const reqUser = users.find((user) => user.username === username);

  if (!reqUser) {
    return res.sendStatus(418);
  }
  await compare(password, reqUser.password, function (err, result) {
    if (err) {
      throw console.error(err);
    }
    if (result) {
      req.session.authenticated = true;
      req.session.user = {
        username: reqUser.username,
        firstName: reqUser.firstName,
        lastName: reqUser.lastName,
        email: reqUser.email,
      };
      res.json(req.session);
    } else {
      res.sendStatus(418);
    }
  });
});

// EDIT PROFILE
app.put("/edit-profile", (req, res) => {
  const userInDb = users.find((user) => user.username === "testing");
  userInDb.email = req.body.email;
  console.log(users);
  res.json(users);
});

// CURRENT STATUS
app.get("/current-user", (req, res) => {
  res.json(req.session);
});

// LOGOUT
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    res.clearCookie("connect.sid");
    res.send("Logged out");
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
