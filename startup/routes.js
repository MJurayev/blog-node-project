const express = require('express');
const errorMiddleware = require('../middleware/error');
const auth = require('../middleware/auth');
const usersRoute = require("../routes/users");
const homeRoute = require("../routes/home");
const postsRoute = require("../routes/posts");
const adminRoute = require("../routes/admin");
const authRoute = require("../routes/auth");
module.exports = function (app) {
    
    app.use(express.json());
    app.use("/api",  homeRoute);
    app.use("/api/users", usersRoute);
    app.use("/api/posts", postsRoute);
    app.use("/api/admin", adminRoute);
    app.use("/api/auth", authRoute);
    app.use(errorMiddleware);
}