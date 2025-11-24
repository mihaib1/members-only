const { Router } = require("express");
const messageRouter = Router();
const db = require("../db/queries");
const messageQueries = new db.MessageQueries();

messageRouter.get("/create", checkAuthenticated, (req, res) => {
    res.render("message-form", {user: req.user});
});

messageRouter.post("/create", (req, res) => {
    if(req.user && req.body){
        let messageCreationObj = {
            title: req.body.title,
            text: req.body.message,
            created_by: req.user.id,
        }
        console.log("creationObj = ", messageCreationObj);
        let newRow = messageQueries.createMessage(messageCreationObj);
        newRow.then(result => {
            console.log(result);
        })
        res.redirect("/");
    } else {
        res.redirect("/")
    }
});

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

module.exports = messageRouter;