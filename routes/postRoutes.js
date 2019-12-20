const Router = require("express").Router;
const db = require("../models");

const postRoutes = new Router();

postRoutes.get("/posts", async (req, res) => {
  const Posts = await db.Post.findAll({});
  res.json(Posts);
});

postRoutes.post("/post", async (req, res) => {
  const user = db.User.findOne({
    where: { id: req.body.id, password: req.body.password }
  }).then(() => {
    if (!user) {
      return res.json({ err: "User not logged in!" });
    }
    db.Post.create({ text: req.body.text, UserId: req.body.id });
    res.end();
  });
});

module.exports = postRoutes;
