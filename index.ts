import express, {Request, Response} from "express"

import { Callback } from "mongoose";



const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const sessionsController = require("./controller/session_controller")
const imageController = require("./controller/image_controller")
//const authController = require("./controller/auth_controller");
const session = require("express-session");
const multer = require("multer");



require("dotenv").config();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.set("view engine", "ejs");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

//multer image upload and storage
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req: Request, file: {fieldname: String, originalname: String}, callback: Callback) => {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

const passport = require("./middleware/passport");
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");

app.use(passport.localLogin.initialize());
app.use(passport.localLogin.session());
app.use(passport.githubLogin.initialize());
app.use(passport.githubLogin.session());
app.use(upload.any());




const { ensureAuthenticated } = require("./middleware/checkAuth.js");
const { database, userModel } = require("./models/userModel");

// Middleware for express

// Routes start here

app.get("/reminders", ensureAuthenticated, reminderController.list);

app.get("/reminder/new", ensureAuthenticated, reminderController.new);

app.get("/reminder/:id", ensureAuthenticated, reminderController.listOne);

app.get("/reminder/:id/edit", ensureAuthenticated, reminderController.edit);

app.post("/reminder/", ensureAuthenticated, reminderController.create);

app.post("/reminder/update/:id", reminderController.update);

app.post("/reminder/delete/:id", reminderController.delete);

app.post("/admin/revoke/:id",sessionsController.revoke)

app.use("/", indexRoute);
app.use("/auth", authRoute);

app.post("/uploads", imageController.upload)



app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
