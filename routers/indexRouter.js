const { Router } = require("express");
const indexRouter = Router();

const db = require("../db/queries");
const passport = require("passport");

const messageQueries = new db.MessageQueries();

indexRouter.get("/", async(req, res) => {
    let messages = [];
    if(req.isAuthenticated()){
        messages = await messageQueries.getAllMessagesWithDetails();
    } else {
        messages = await messageQueries.getOnlyMessages();
    }
    res.render("home", {user: req.user, messages: messages});
});

indexRouter.get("/login", checkNotAuthenticated, (req, res) => {
    res.render("login");
});

indexRouter.get("/messages", async (req, res) => {
    let messages = [];
    if(req.isAuthenticated()){
        messages = await messageQueries.getAllMessagesWithDetails();
    } else messages = await messageQueries.getOnlyMessages();

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