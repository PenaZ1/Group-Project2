const Router = require("express").Router;
const db = require("../models");

const htmlRoutes = new Router();

htmlRoutes.get("/", async (req, res) => {
  res.render("index");
});

htmlRoutes.get("/feed", async (req, res) => {
  res.render("feed");
});

// Load profile for user
htmlRoutes.get("/user/:id", async (req, res) => {
  const dbUser = await db.User.findOne({
    where: {
      id: parseInt(req.params.id)
    }
  });

  res.render("profile", {
    // Replace this shit with the profile view
    user: dbUser
  });
});

// Render 404 page for any unmatched routes
htmlRoutes.get("*", async (req, res) => {
  res.render("404");
});

module.exports = htmlRoutes;
