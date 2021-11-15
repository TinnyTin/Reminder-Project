const express = require("express");
const app = express();
const path = require("path");
const ejsLayouts = require("express-ejs-layouts");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");
const session = require("express-session");
const multer = require("multer");
const imgur = require("imgur");
// const helmet = require("helmet");
// const morgan = require("morgan");
const fs = require("fs");


require("dotenv").config();
// app.use(helmet());
// app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ extended: false }));
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
  filename: (req, file, callback) => {
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

// Implement this yourselfzz
app.post("/reminder/update/:id", reminderController.update);

// Implement this yourself
app.post("/reminder/delete/:id", reminderController.delete);

app.use("/", indexRoute);
// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.use("/auth", authRoute);


app.post("/uploads", async (req, res) => {
  const file = req.files[0]
  try {
    const url = await imgur.uploadFile(`./uploads/${file.filename}`);
    //res.json({ message: url.link });
    fs.unlinkSync(`./uploads/${file.filename}`);
    userModel.findById(req.user.id).photo = url.link
    res.redirect("/dashboard")
  } catch (error) {
    console.log("error", error);
  }
})



app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001/reminders in your browser 🚀"
  );
});
