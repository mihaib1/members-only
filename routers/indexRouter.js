const { Router } = require("express");
const indexRouter = Router();

const db = require("../db/queries");
const passport = require("passport");

indexRouter.get("/", checkAuthenticated, (req, res) => {
    res.render("home", {user: req.user});
});

indexRouter.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("login");
})

function checkAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    res.redirect("/login");
}

function checkNotAuthenticated(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect("/");
    }
    next();
}

module.exports = indexRouter;