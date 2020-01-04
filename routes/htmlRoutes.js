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
  if (!dbUser){
    return res.end();
  }
  const posts = await db.Post.findAll({
    where: {
      UserId: dbUser.id
    }
  });
  console.log(posts)
  res.render("profile", {
    user: dbUser,
    posts: posts
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
    // include association with find by Pk
    posts.push({
      postUser: user.username,
      postContent: postModels[i].dataValues.text,
      imgURL: "/images/logoprofile.png",
      nsfw: postModels[i].dataValues.nsfw,
      id: postModels[i].dataValues.id
    });
  }
  console.log(posts);
  res.render("feed", { posts });
});

htmlRoutes.get("/signup", async (req, res) => {
  res.render("signUp");
});

htmlRoutes.get("/follow", async (req, res) => {
  const user = await db.User.findOne({
    include: [
      { model: db.User, as: "Follower", required: false, through: "Followers" }
    ],
    where: { id: 1 } // req.body.id
  });
  const followers = [];
  for (var i = 0; i < user.dataValues.Follower.length; i++){
    followers.push({ username: user.dataValues.Follower[i].username });
  }
  //console.log(user.dataValues.Follower);
  res.render("follow", { followers });
});

// Render 404 page for any unmatched routes
htmlRoutes.get("*", async (req, res) => {
  res.render("404");
});

module.exports = htmlRoutes;
