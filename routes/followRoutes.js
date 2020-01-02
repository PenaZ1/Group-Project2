const db = require("../models");
const Router = require("express").Router;
// const passport = require("../passport");

const follow = new Router();

follow.post("/follow/:id", async (req, res) => {
  const user1 = await db.User.findOne({ where: { id: req.params.id } });
  const user2 = await db.User.findOne({ where: { id: req.body.id } });
  user1.addFollower(user2);
  res.end().status(200);
});

module.exports = follow;
