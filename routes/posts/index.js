const Router = require("express").Router;
const db = require("../../models");

const postRoutes = Router();

postRoutes.get("/", async (req, res) => {
  const Posts = await db.Post.findAll({}
       , {
        include: [
          {
            model: Likes,
            as: "likes"
          }
        ]
      }
    );
  res.json(Posts);
});

module.exports = postRoutes;
