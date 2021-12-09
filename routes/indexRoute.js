const express = require("express")
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const reminderController = require("../controller/reminder_controller");
const sessionsController = require("../controller/session_controller")
require('dotenv').config()


router.get("/", async (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, isAdmin, async (req, res) => {    
    res.render("dashboard", {
      user: req.user,
    });
});

router.get("/admin", ensureAuthenticated, (req, res) => {
  req.sessionStore.all((err,sessions) => {
    if(err) console.log(err)
    else {
      res.render("admin", {
        user: req.user, sessions: sessions,
      });
    }
  })
});



router.get("/uploads", ensureAuthenticated, (req, res) => {
  res.render("uploads", { user: req.user });
});

router.get("/reminders", ensureAuthenticated, reminderController.list);

router.post("/admin/revoke/:id",sessionsController.revoke)

module.exports = router;


