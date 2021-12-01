const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
require('dotenv').config()

router.get("/", async (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, isAdmin, async (req, res) => {
    // let user = await prisma.user.findUnique({ where: { id: userId } });
    
    res.render("dashboard", {
      user: req.user,
    });
});

router.get("/admin", ensureAuthenticated, (req, res) => {
  req.sessionStore.all((err,sessions) => {
    if(err) console.log(err)
    else {
      console.log(sessions)
      res.render("admin", {
        user: req.user, sessions: sessions,
      });
    }
  })
});

router.get("/uploads", ensureAuthenticated, (req, res) => {
  res.render("uploads", { user: req.user });
});


module.exports = router;


