const registrationController = require("../controllers/registerController");
const registrationActions = new registrationController.ControllerActions();

const { Router } = require("express");
const registerRouter = Router();

registerRouter.get("/", (req, res) => {
    res.render("user-form", {isEdit: false});
});

registerRouter.post("/", (req, res) => {
    let registrationResult = registrationActions.createUser(req.body);
    registrationResult.then((result) => {
        res.redirect("/");
    });
});


module.exports = registerRouter;