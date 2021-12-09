const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");
const GitHubStrategy = require("passport-github2").Strategy;

const githubLogin = passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: "http://localhost:3001/auth/github/callback",
    },
<<<<<<< HEAD
    (accessToken, refreshToken, profile, done) => {
      let user = userController.getUserGit(profile);
=======
    async (accessToken, refreshToken, profile, done) => {
      let user = await userController.getUserGit(profile)
>>>>>>> 6396782fcc1abf69101f5a5d437ad454b68198d6
      return user
        ? done(null, user)
        : done(null, false, {
            message: "Invalid Credentials",
          });
    }
  )
);

const localLogin = passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
<<<<<<< HEAD
    (email, password, done) => {
      const user = userController.getUserByEmailIdAndPassword(email, password);
=======
    async (email, password, done) => {
      const user = await userController.getUserByEmailIdAndPassword(email, password)
>>>>>>> 6396782fcc1abf69101f5a5d437ad454b68198d6
      return user
        ? done(null, user)
        : done(null, false, {
            message: "Invalid Credentials. Please try again",
          });
    }
  )
);

passport.serializeUser(function (user, done) {
  // The function where a session is created
  done(null, user.id);
});

<<<<<<< HEAD
passport.deserializeUser(function (id, done) {
  let user = userController.getUserById(id);
=======
passport.deserializeUser(async (id, done) => {
  let user = await userController.getUserById(id);
>>>>>>> 6396782fcc1abf69101f5a5d437ad454b68198d6
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = { localLogin, githubLogin };
