const bcrypt = require("bcryptjs");

const { Router } = require("express");
const passport = require("passport");
const loginRouter = Router();

loginRouter.get("/", (req, res) => {
    res.render("login");
});

loginRouter.post('/', checkNotAuthenticated, passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}));

function checkAuthenticated(req, res, next){
    console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        res.redirect("/");
    }
    next();
}

module.exports = loginRouter;