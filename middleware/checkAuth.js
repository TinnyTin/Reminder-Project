module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect("/auth/login");
    },
    forwardAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.render("/dashboard");
    },
    isAdmin: function(req, res, next) {
        if (req.user.role === "admin") {
            res.redirect("/admin");
        }
        else{
            return next()
        }
    },  
};