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

  res.render("example", {
    // Replace this shit with the profile view
    example: dbUser
  });

  console.log(dbUser);
});

// Render 404 page for any unmatched routes
htmlRoutes.get("*", async (req, res) => {
  res.render("404");
});

module.exports = htmlRoutes;
