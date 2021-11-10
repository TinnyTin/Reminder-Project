const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
require('dotenv').config()

router.get("/", async (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    //   getting so that when used in dashboard.ejs i could pull out specific items
    user: req.user,
  });
});

module.exports = router;
