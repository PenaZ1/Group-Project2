var passport = require("passport");
LocalStrategy = require("passport-local").Strategy;
const db = require("../models");
const bcrypt = require("bcrypt");

const Router = require("express").Router;
const login = new Router();

passport.use(
  new LocalStrategy((username, password, done) => {
    db.User.findOne({ where: { username: username } }).then((user, err) => {
      console.log(user.dataValues.password);
      console.log(bcrypt.hashSync(password, 10));
      //console.log(err,user);
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      bcrypt.compare(password, user.dataValues.password, function(err, res) {
        if (err) {
          return done(err);
        } else if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password." });
        }
      });
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
  return res.status(200).json({
    url: "/user/" + req.user.id,
    session: {
      id: req.user.dataValues.id,
      password: req.user.dataValues.password
    }
  });
});

module.exports = login;
