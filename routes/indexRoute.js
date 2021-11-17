const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
require('dotenv').config()

router.get("/", async (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  if (req.user.role === "admin") res.redirect("/admin")
  else {
    res.render("dashboard", {
      user: req.user,
    });
  }

});

router.get("/admin", ensureAuthenticated, (req, res) => {
  res.render("admin", {
    user: req.user,
  });
});

module.exports = router;

router.get("/uploads", ensureAuthenticated, (req, res) => {
  res.render("uploads", { user: req.user });
});

