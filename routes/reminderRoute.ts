const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const reminderController = require("../controller/reminder_controller");



router.get("/new", ensureAuthenticated, reminderController.new);

router.get("/:id", ensureAuthenticated, reminderController.listOne);

router.get("/:id/edit", ensureAuthenticated, reminderController.edit);

router.post("/", ensureAuthenticated, reminderController.create);

router.post("/update/:id", reminderController.update);

router.post("/delete/:id", reminderController.delete);

module.exports = router;