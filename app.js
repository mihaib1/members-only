require("dotenv").config();
const PORT = process.env.PORT ? process.env.PORT : 3000;

const indexRouter = require("./routers/indexRouter");
const loginRouter = require("./routers/loginRouter");
const registerRouter = require("./routers/registerRouter");

const flash = require("express-flash");
const methodOverride = require("method-override");

const session = require("express-session");
const passport = require("passport");

const initializePassport = require("./passport-config");
initializePassport(passport);

const path = require('node:path');
const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/bootstrap", express.static(__dirname + '/node_modules/bootstrap/dist'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(methodOverride("_method"));

app.use(session({
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

//app.use("/", indexRouter);
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

app.delete("/logout", (req, res, next) => {
    req.logout(function(err){
        if(err) return next(err);
         
    });
    res.redirect("/");
})

app.listen(PORT, function(err){
    if(err){
        throw(err)
    } 
    console.log(`Listening on port ${PORT}`);
});

