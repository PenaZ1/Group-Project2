const db = require("../models");
const Router = require("express").Router;
const bcrypt = require("bcrypt");

const register = new Router();

register.post("/register", async (req, res) => {
  newUser = await db.User.findOne({ where: { username: req.body.username } });
  if (!newUser) {
    await db.User.create({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.username
    });
    console.log(bcrypt.hashSync(req.body.password, 10));
    return res.status(201).json({ url: "/" });
  }
  return res.status(200).json({ err: "Username already taken!" });
});

module.exports = register;
