const db = require("../models");
const Router = require("express").Router;

const register = new Router();

register.post("/register", async (req, res) => {
  newUser = await db.User.findOne({ where: { username: req.body.username } });
  if (!newUser) {
    const newUser = await db.User.create(req.body);
    return res.status(201).json({ url: "/user/" + newUser.id });
  }
  return res.status(200).json({ err: "Username already taken!" });
});

module.exports = register;
