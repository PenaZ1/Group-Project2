const Router = require("express").Router;
const apiRoutes = require("./apiRoutes");
const htmlRoutes = require("./htmlRoutes");
const loginRoutes = require("./loginRoutes");
const registerRoutes = require("./registerRoutes");

const router = new Router();

router.use("/api", apiRoutes);
router.use("", htmlRoutes);
router.use("", loginRoutes);
router.use("", registerRoutes);

module.exports = router;
