import express, {Request, Response} from "express"

import { Callback } from "mongoose";

const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const imageController = require("./controller/image_controller")
const session = require("express-session");
const multer = require("multer");
const { ensureAuthenticated } = require("./middleware/checkAuth.js");

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
const reminderRoute = require("./routes/reminderRoute");

// Middleware

app.use(passport.localLogin.initialize());
app.use(passport.localLogin.session());
app.use(passport.githubLogin.initialize());
app.use(passport.githubLogin.session());
app.use(upload.any());




// Routes start here

app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/reminder", reminderRoute);
app.get("/reminders", ensureAuthenticated, reminderController.list);
app.post("/uploads", imageController.upload)



app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
