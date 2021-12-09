const imgur = require("imgur");
const fs = require("fs");
const fetch = require("node-fetch")

const prisma = require("../prisma")

let imageController = {
    upload: async (req, res) => {
    const file = req.files[0]
    try {
      const url = await imgur.uploadFile(`./uploads/${file.filename}`);
      fs.unlinkSync(`./uploads/${file.filename}`);
      user = await prisma.user.update({
               where: { id: req.user.id },
               data: {
                 photo: url.link,
               },
             });
      res.redirect("/dashboard")
    } catch (error) {
      console.log("error", error);
    }
  },

    grabRandomImage: async () => {
      const clientId = process.env.unsplashID; 
      const query = "person"
      const url = `https://api.unsplash.com/search/photos/?client_id=${clientId}&query=${query}?`;
      const data = await fetch(url);
      const jsonData = await data.json()
      return (jsonData)
    }
}

module.exports = imageController;