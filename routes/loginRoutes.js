const Router = require("express").Router;
const passport = require("../passport");

const login = new Router();

login.post("/login", passport.authenticate("local"), (req, res) => {
  // req.user contains the user
  return res.status(200).json({
    url: "/feed",
    session: {
      id: req.user.dataValues.id,
      password: req.user.dataValues.password,
      imgURL: "/images/logoprofile.png"
    }
  });
});

module.exports = login;
