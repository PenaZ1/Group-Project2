const Router = require("express").Router;
const userRoutes = require("./users");
const postRoutes = require("./posts");

const apiRoutes = Router();

apiRoutes.use("/users", userRoutes);
apiRoutes.use("/posts", postRoutes);

module.exports = apiRoutes;
