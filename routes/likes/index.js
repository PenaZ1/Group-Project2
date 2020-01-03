const Router = require("express").Router;
const db = require("../../models");

const likeRoutes = Router();

likeRoutes.get("/", async (req, res) => {
  const Likes = await db.Likes.findAll({});
  res.json(Likes);
});

likeRoutes.post("/:PostId", async (req, res) => {
  db.Likes.create({
    checked: true,
    userID: req.session.id,
    PostId: req.params.PostId
    // front end pass it as postID
  });
  res.end();
});

module.exports = likeRoutes;
