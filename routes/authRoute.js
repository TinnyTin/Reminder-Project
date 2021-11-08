const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
let { database } = require("../models/userModel.js");

const router = express.Router();

router.get("/login", forwardAuthenticated, (req, res) =>
  res.render("auth/login")
);
router.get("/register", (req, res) => res.render("auth/register"));

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/auth/login");
});

router.post(
  "/login",
  passport.localLogin.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
  })
);

router.post("/register", (req, res) => {
  database.push({
    id: database.length + 1,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  database["password"] = req.body.password;
  res.render("auth/login");
});

router.get(
  "/github",
  passport.githubLogin.authenticate("github", { scope: ["profile"] })
);

router.get(
  "/github/callback",
  passport.githubLogin.authenticate("github", {
    failureRedirect: "/auth/login",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/dashboard");
  }
);

module.exports = router;
