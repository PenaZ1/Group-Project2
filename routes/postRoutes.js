const Router = require("express").Router;
const db = require("../models");

const createPost = new Router();

createPost.post("/post", async (req, res) => {
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

module.exports = createPost;
