const Router = require("express").Router;
const exampleRoutes = require("./examples");
const userRoutes = require("./users");

const apiRoutes = Router();

apiRoutes.use("/examples", exampleRoutes);
apiRoutes.use("/users", userRoutes);

module.exports = apiRoutes;
