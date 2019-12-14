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

// Load example page and pass in an example by id
htmlRoutes.get("/user/:id", async (req, res) => {
  const dbUser = await db.Example.findOne({
    where: {
      id: req.params.id
    }
  });

  res.render("user", {
    example: dbUser // Replace this shit with the profile view
  });
  
});

// Render 404 page for any unmatched routes
htmlRoutes.get("*", async (req, res) => {
  res.render("404");
});

module.exports = htmlRoutes;
