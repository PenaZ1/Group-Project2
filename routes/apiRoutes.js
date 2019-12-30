const Router = require("express").Router;
const userRoutes = require("./users");
const postRoutes = require("./posts");
const likeRoutes = require("./likes");

const apiRoutes = Router();

apiRoutes.use("/users", userRoutes);
apiRoutes.use("/posts", postRoutes);
apiRoutes.use("/likes", likeRoutes);

module.exports = apiRoutes;
