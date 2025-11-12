require("dotenv").config();
const PORT = process.env.PORT ? process.env.PORT : 3000;

const indexRouter = require("./routers/indexRouter");
const loginRouter = require("./routers/loginRouter");
const registerRouter = require("./routers/registerRouter");

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const path = require('node:path');
const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/bootstrap", express.static(__dirname + '/node_modules/bootstrap/dist'));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

app.listen(PORT, function(err){
    if(err){
        throw(err)
    } 
    console.log(`Listening on port ${PORT}`);
});
