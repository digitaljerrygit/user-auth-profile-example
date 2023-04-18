require("dotenv").config();
const express = require("express");
const app = express();
const session = require("express-session");
const bcrypt = require("bcrypt");
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

let users = [
  {
    username: "testing",
    password: "testing",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@gmail.com",
  },
];

// GET ALL USERS
app.get("/users", (req, res) => {
  res.json(users);
});

// REGISTRATION
app.post("/signup", async (req, res) => {
  const password = await bcrypt.hash(req.body.password, 10);
  users.push({
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
app.post("/users", (req, res) => {
  const { username, password } = req.body;
  const reqUser = users.find((user) => user.username === username);

  const reqPassword = String(reqUser.password);
  const compare = bcrypt.compare(password, reqPassword);

  if (compare) {
    req.session.authenticated = true;
    req.session.username = username;
    res.json(req.session);
  } else {
    res.sendStatus(418);
  }
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
