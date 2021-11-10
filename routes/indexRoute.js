const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
require('dotenv').config()

router.get("/", async (req, res) => {
  res.send("welcome");
  const clientId = process.env.CLIENT_ID; 
  const query = "people"
  const url = "https://api.unsplash.com/search/photos?client_id=${clientId}&query=${query}";
  const data = await fetch(url);
  const jsonData = await data.json()
    const imageFromUnsplash = jsonData.results;
    console.log(imageFromUnsplash)
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    //   getting so that when used in dashboard.ejs i could pull out specific items
    user: req.user,
  });
});

module.exports = router;
