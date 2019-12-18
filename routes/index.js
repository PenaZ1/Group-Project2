const Router = require("express").Router;
const apiRoutes = require("./apiRoutes");
const htmlRoutes = require("./htmlRoutes");
const loginRoutes = require("./loginRoutes");

const router = new Router();

router.use("/api", apiRoutes);
router.use("", htmlRoutes);
router.use("", loginRoutes);

module.exports = router;
