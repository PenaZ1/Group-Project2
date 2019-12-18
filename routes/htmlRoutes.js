const Router = require("express").Router;
const db = require("../models");

const htmlRoutes = new Router();

htmlRoutes.get("/", async (req, res) => {
  const dbExamples = await db.Example.findAll({});

  res.render("index", {
    msg: "Welcome!",
    examples: dbExamples
  });
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
});

// Render 404 page for any unmatched routes
htmlRoutes.get("*", async (req, res) => {
  res.render("404");
});

module.exports = htmlRoutes;
