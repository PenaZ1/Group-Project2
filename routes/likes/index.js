const Router = require("express").Router;
const db = require("../../models");

const likeRoutes = Router();

likeRoutes.get("/", async (req, res) => {
  const Likes = await db.Likes.findAll({});
  res.json(Likes);
});

likeRoutes.post("/:postID", async (req, res) => {
  const Likes = await db.Likes.create({
    checked: true,
    userID: req.session.id,
    postID: req.params.postID
    // front end pass it as postID
  });
  res.redirect("/feed");
});

module.exports = likeRoutes;
