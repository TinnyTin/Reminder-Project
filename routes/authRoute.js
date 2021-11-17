const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
let { database } = require("../models/userModel.js");
const fetch = require("node-fetch");


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


router.post("/register", async (req, res) => {
  const clientId = process.env.unsplashID; 
  const query = "person"
  const url = `https://api.unsplash.com/search/photos/?client_id=${clientId}&query=${query}?`;
  const data = await fetch(url);
  const jsonData = await data.json()
  const imagesFromUnsplash = jsonData.results;
  imageIndex = Math.floor(Math.random() * imagesFromUnsplash.length)
  database.push({
    id: database.length + 1,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    photo: imagesFromUnsplash[imageIndex].urls.small
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
