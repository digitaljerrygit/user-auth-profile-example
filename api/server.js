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
    password: "$2b$10$Z9pm7ldKqH/KAMoCpKmxFOHbIorJwSHyDdbz3NbQnkLGxD8KPoM6a",
    firstName: "Jane",
    lastName: "Doe",
    email: "testing_email@gmail.com",
  },
];

// GET ALL USERS
app.get("/users", (req, res) => {
  res.json(users);
});

// REGISTRATION
app.post("/signup", async (req, res) => {
  const userInDb = users.find((user) => user.username === req.body.username);
  if (userInDb) {
    return res.sendStatus(404);
  }
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
app.post("/users", async (req, res) => {
  const { username, password } = req.body;
  const reqUser = users.find((user) => user.username === username);
  const compare = await bcrypt.compare(password, reqUser.password);

  if (compare) {
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

// EDIT PROFILE

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
