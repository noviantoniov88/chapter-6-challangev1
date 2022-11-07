const express = require("express");
const bcrypt = require("bcrypt");
const { addHours, addMinutes } = require("date-fns");

const db = require("./db/users.json");
const { isAuthenticated } = require("./middleware");
const { generateToken } = require("./utils/common");
const route = express.Router();


route.post(
  "/auth/login",
  (req, res, next) => {
    const { username, password } = req.body;

    // Make sure username & password are filled
    if (!username && !password) {
      return res
        .status(401)
        .json({ error: "Bad Request! Username and password are required." });
    }

    // Check username from database
    const user = db.find((user) => user.username === username);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    // Compare password
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return res.status(404).json({ error: "User not found!" });
    }

    req.user = user;

    next();
  },
  (req, res) => {
    const { username, email } = req.user; // Destructure

    const loggedInAt = Date.now();
    const accessToken = generateToken({
      loggedInAt,
      user: { username, email },
    });
    const accessTokenExpiredAt = addHours(loggedInAt, 1);
    const refreshToken = generateToken({
      loggedInAt,
    });
    const refreshTokenExpiredAt = addMinutes(loggedInAt, 50);

    res.json({
      accessToken,
      accessTokenExpiredAt,
      refreshToken,
      refreshTokenExpiredAt,
    });
  }
);

// Protected Endpoint
route.get("/me", isAuthenticated, (req, res) => {
  req.log.info("Start getting user information");
  const user = db.find((user) => user.username === req.session.user.username);
  res.json(user);
});
route.get("/users", isAuthenticated, (req, res) => {
  res.json(db);
});



route.get("/", (req, res) => {
  res.render("auth/form");
});


module.exports = route;
