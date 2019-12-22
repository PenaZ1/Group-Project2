const Router = require("express").Router;
const db = require("../models");

const htmlRoutes = new Router();

htmlRoutes.get("/", async (req, res) => {
  res.render("index");
});

// Load profile for user
htmlRoutes.get("/user/:id", async (req, res) => {
  const dbUser = await db.User.findOne({
    where: {
      id: parseInt(req.params.id)
    }
  });

  res.render("profile", {
    user: dbUser
  });
});
//load feed page upon login needs someone to make sure it's working
htmlRoutes.get("/feed", async (req, res) => {
  const posts = [];
  const postModels = await db.Post.findAll({
    order: [["id", "DESC"]],
    limit: 10
  });
  for (var i = 0; i < postModels.length; i++) {
    const user = await db.User.findByPk(postModels[i].dataValues.UserId);
    posts.push({
      postUser: user.username,
      postContent: postModels[i].dataValues.text,
      imgURL: "/images/logoprofile.png",
      nsfw: postModels[i].dataValues.nsfw
    });
  }
  res.render("feed", { posts });
});

htmlRoutes.get("/signup", async (req, res) => {
  res.render("signUp");
});

// Render 404 page for any unmatched routes
htmlRoutes.get("*", async (req, res) => {
  res.render("404");
});

module.exports = htmlRoutes;
