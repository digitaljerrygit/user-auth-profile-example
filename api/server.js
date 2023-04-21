import dotenv from "dotenv";
dotenv.config();
import express, { json, urlencoded } from "express";
const app = express();
import session from "express-session";
import morgan from "morgan";
import { nanoid } from "nanoid";
import users from "./users.js";
import mysql from "mysql2";
import bcrypt from "bcrypt";

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// REGISTRATION
app.post("/signup", async (req, res) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const newUser = {
    public_id: nanoid(12),
    username: req.body.username,
    password: await bcrypt.hash(req.body.password, 10),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
  };

  const insertUserQuery = `
  INSERT INTO \`user\` (public_id, username, password, firstName, lastName, email)
  VALUES (?, ?, ?, ?, ?, ?)
  `;
  connection.query(
    insertUserQuery,
    [
      newUser.public_id,
      newUser.username,
      newUser.password,
      newUser.firstName,
      newUser.lastName,
      newUser.email,
    ],
    (err, results) => {
      if (err) {
        // console.error("Error inserting user: " + err.stack);
        console.log("ERROR_CODE:", err.code);
        res.send(err.code).status(400).end();
        return;
      }
      console.log("Inserted new user with ID " + results.insertId);
      req.session.authenticated = true;
      req.session.user = {
        public_id: newUser.public_id,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      };
      res.json(req.session);
    }
  );

  connection.end();
});

// LOGIN
app.post("/users", async (req, res) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const userInDb = {
    username: req.body.username,
    password: req.body.username,
  };

  const insertUserQuery = `
  SELECT * FROM user
    WHERE username=?;
  `;
  connection.query(
    insertUserQuery,
    [userInDb.username],
    async (err, results) => {
      if (err) {
        console.log("ERROR_CODE:", err.code);
        res.send(err.code).status(400).end();
        return;
      }
      // Does user exist? then check password
      const dbData = results[0];
      if (results.length > 0) {
        await bcrypt.compare(
          req.body.password,
          results[0].password,
          function (err, success) {
            if (err) {
              console.log(err.code);
              return;
            } else if (success === true) {
              req.session.authenticated = true;
              req.session.user = {
                public_id: dbData.public_id,
                username: dbData.username,
                firstName: dbData.firstName,
                lastName: dbData.lastName,
                email: dbData.email,
              };
              res.json(req.session);
            } else {
              res.sendStatus(400);
            }
          }
        );
      }
    }
  );

  connection.end();
});

// EDIT PROFILE INFORMATION
app.put("/edit/:item/for/:public_id", (req, res) => {
  const connection = mysql.createConnection(process.env.DATABASE_URL);
  const editEmail = `
    UPDATE user SET email = ? WHERE public_id = ?
  `;
  const editUsername = `
    UPDATE user SET username = ? WHERE public_id = ?
  `;
  if (req.params.item === "email") {
    connection.query(
      editEmail,
      [req.body.newValue, req.params.public_id],
      function (err, results) {
        if (err) {
          console.error(err.code);
          res.sendStatus(400);
        } else {
          req.session.user.email = req.body.newValue;
          res.json(req.session);
        }
      }
    );
  } else if (req.params.item === "username") {
    connection.query(
      editUsername,
      [req.body.newValue, req.params.public_id],
      function (err, results) {
        if (err) {
          console.error(err.code);
          res.sendStatus(400);
        } else {
          req.session.user.username = req.body.newValue;
          res.json(req.session);
        }
      }
    );
  } else {
    res.sendStatus(400);
  }
  connection.end();
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
