const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const reminderController = require("./controller/reminder_controller");
const sessionsController = require("./controller/session_controller")

router.get("/reminder/new", ensureAuthenticated, reminderController.new);

router.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);

router.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

router.post("/reminder/", ensureAuthenticated, reminderController.create);

router.post("/reminder/update/:id", reminderController.update);

router.post("/reminder/delete/:id", reminderController.delete);

router.post("/admin/revoke/:id",sessionsController.revoke)