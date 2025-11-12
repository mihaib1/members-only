const bcrypt = require("bcryptjs");

const { Router } = require("express");
const loginRouter = Router();


loginRouter.get("/", (req, res) => {
    res.render("login");
});

loginRouter.post("/", async (req, res) => {
    console.log(req.body);
    let password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    res.redirect("/");
})

module.exports = loginRouter;