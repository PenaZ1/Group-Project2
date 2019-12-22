const Router = require("express").Router;
const db = require("../../models");

const userRoutes = Router();

userRoutes
  .route("/")

  .get(async (req, res) => {
    const Users = await db.User.findAll({
      attributes: {
        exclude: ["password", "email"]
      }
    });
    res.json(Users);
  });

// Delete a user by id
// This should require authentication
/*
userRoutes.delete("/:id", async (req, res) => {
  const dbUser = await db.User.destroy({
    where: {
      id: req.params.id
    }
  });
  res.json(dbUser);
});
*/

module.exports = userRoutes;
