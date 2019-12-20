var passport = require("passport");
LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

const Router = require("express").Router;
const login = new Router();

passport.use(
  new LocalStrategy((username, password, done) => {
    db.User.findOne({ where: { username: username } }).then((user, err) => {
      //console.log(err,user);
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (user.dataValues.password !== password) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.User.findById(id, function(err, user) {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});

login.post("/login", passport.authenticate("local"), (req, res) => {
  // req.user contains the user
  //console.log(req.session.passport.user);
  //req.session.id = req.user.id;
  return res.status(200).json({
    url: "/user/" + req.user.id,
    session: {
      id: req.user.dataValues.id,
      password: req.user.dataValues.password
    }
  });
});

module.exports = login;
