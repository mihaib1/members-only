const { Router } = require("express");
const messageRouter = Router();
const db = require("../db/queries");
const messageQueries = new db.MessageQueries();
const authUtils = require("../authUtils");
const authenticationUtils = new authUtils.AuthenticationUtils();

messageRouter.get("/create", authenticationUtils.checkAuthenticated, (req, res) => {
    res.render("message-form", {user: req.user});
});

messageRouter.post("/create", (req, res) => {
    if(req.user && req.body){
        let messageCreationObj = {
            title: req.body.title,
            text: req.body.message,
            created_by: req.user.id,
        }
        let newRow = messageQueries.createMessage(messageCreationObj);
        newRow.then(result => {
            res.redirect("/");
        })
    } else {
        res.redirect("/")
    }
});

module.exports = messageRouter;