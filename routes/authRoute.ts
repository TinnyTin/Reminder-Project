import express, {Request, Response} from "express"
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const imageController = require("../controller/image_controller")
const authController = require("../controller/auth_controller")
const router = express.Router();
const prisma = require("../prisma")

router.get("/login", forwardAuthenticated, authController.login);

router.get("/register", authController.register);

router.get("/logout", (req: Request, res: Response) => {
  req.logout();
  res.redirect("/auth/login");
});

router.post("/login", authController.loginSubmit);


router.post("/register", async (req: Request, res: Response, next) => {

  // Grab random image
  const imagesFromUnsplash = await imageController.grabRandomImage();
  const imageIndex:number = Math.floor(Math.random() * Object.keys(imagesFromUnsplash).length)
  const {name, email, password} = req.body
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    res.json({ error: "User already exists" });
  } else {
    const createdUser = await prisma.user.create({
        data:{
            id: Math.random().toString(36).substr(2, 9),
            email: email,
            password: password,
            name: name,
            role: "user",
            photo: imagesFromUnsplash.results[imageIndex].urls.small
    }});
    return next()
  }
},   passport.localLogin.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/auth/login",
}));

router.get(
  "/github",
  passport.githubLogin.authenticate("github", { scope: ["profile"] })
);

router.get(
  "/github/callback",
  passport.githubLogin.authenticate("github", {
    failureRedirect: "/auth/login",
  }),
  function (req: Request, res: Response) {
    // Successful authentication, redirect home.
    res.redirect("/dashboard");
  }
);

module.exports = router;
