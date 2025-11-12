const { Router } = require("express");
const indexRouter = Router();

const db = require("../db/queries");

indexRouter.get("/", (req, res) => {
    res.render("home");
});

indexRouter.get("/login", (req, res) => {
    res.render("login");
})

module.exports = indexRouter;