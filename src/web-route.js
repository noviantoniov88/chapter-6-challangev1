const express = require("express");
const webRoute = express.Router();

const { isAuthenticated } = require("./middleware");
const { generateToken } = require("./utils/common");

const { Usergame, Userbiodata, Userhistory } = require("./models");


webRoute.get("/", isAuthenticated, (req, res) => {
    res.render("auth/form");
  });

module.exports = webRoute;