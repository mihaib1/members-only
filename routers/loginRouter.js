const { Router } = require("express");
const passport = require("passport");
const loginRouter = Router();

const authUtils = require("../authUtils");
const authenticationUtils = new authUtils.AuthenticationUtils();

loginRouter.get("/", (req, res) => {
    res.render("login");
});

loginRouter.post('/', authenticationUtils.checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

module.exports = loginRouter;