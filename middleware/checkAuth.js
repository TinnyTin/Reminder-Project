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
<<<<<<< HEAD
            return next();
        }
        res.render("dashboard",{user:req.user});
=======
            res.redirect("/admin");
        }
        else{
            return next()
        }
>>>>>>> 6396782fcc1abf69101f5a5d437ad454b68198d6
    },  
};