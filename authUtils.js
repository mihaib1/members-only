class AuthenticationUtils {
    checkAuthenticated(req, res, next){
        if(req.isAuthenticated()){
            return next();
        } 
        res.redirect("/login");
    }

    checkNotAuthenticated(req, res, next){
        if(req.isAuthenticated()){
            res.redirect("/");
        }
        next();
    }
}

module.exports = {
    AuthenticationUtils
};

