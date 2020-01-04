var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("./models");

passport.use(
  new LocalStrategy((username, password, done) => {
    db.User.findOne({ where: { username: username } }).then((user, err) => {
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

module.exports = passport;
