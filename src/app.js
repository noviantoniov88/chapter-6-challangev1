const express = require("express");
const logger = require("pino-http");
const dotenv = require("dotenv");
const path = require("path");
const webRoute = require("./web-route");
const route = require("./route");

module.exports = (app)=>{
    dotenv.config();

    app.use(logger());

    app.set('views', path.join(__dirname,'views'));
    app.set("view engine", "ejs");

    app.use(express.static("public"));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(webRoute);
    app.use("/api/v1/", route);

    return app;
}