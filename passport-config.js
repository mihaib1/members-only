const db = require("./db/queries");
const bcrypt = require('bcryptjs');
const userQueries = new db.UserQueries();
const LocalStrategy = require('passport-local').Strategy;

function initialize(passport){
    authenticateUser = async (email, password, done) => {
        const user = await userQueries.getUserDetailsByEmail(email);
        if(!user){
            return done(null, false, {message: "No user found"});
        }
        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user);
            } else {
                return done(null, false, { message: "Incorrect password" })
            }
        } catch(err){
            console.log(err);
            return done(err);
        }

    }
    passport.use(new LocalStrategy({ usernameField: "email"}, 
    authenticateUser))
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await userQueries.getUserById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}

module.exports = initialize