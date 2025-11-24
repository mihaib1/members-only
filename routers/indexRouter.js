const { Router } = require("express");
const indexRouter = Router();

const db = require("../db/queries");
const messageQueries = new db.MessageQueries();

const authUtils = require("../authUtils");
const authenticationUtils = new authUtils.AuthenticationUtils();

indexRouter.get("/", async(req, res) => {
    let messages = [];
    if(req.isAuthenticated()){
        messages = await messageQueries.getAllMessagesWithDetails();
    } else {
        messages = await messageQueries.getOnlyMessages();
    }
    res.render("home", {user: req.user, messages: messages});
});

indexRouter.get("/login", authenticationUtils.checkNotAuthenticated, (req, res) => {
    res.render("login");
});

indexRouter.get("/messages", async (req, res) => {
    let messages = [];
    if(req.isAuthenticated()){
        messages = await messageQueries.getAllMessagesWithDetails();
    } else messages = await messageQueries.getOnlyMessages();

})

module.exports = indexRouter;