var passport = require("passport");
LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

const Router = require("express").Router;
const login = new Router();

passport.use(
  new LocalStrategy((username, password, done) => {
    db.User.findOne(
      { where: { username: username, password: password } },
      function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      }
    );
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.users.findById(id, function(err, user) {
    if (err) {
      return done(err);
    }
    done(null, user);
  });
});

login.post("/login", async (req, res, next) => {
  const dbExamples = await db.Example.findAll({});

  passport.authenticate("local", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      // a res.redirect also works
      return res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  })(req, res, next);
});

module.exports = login;
