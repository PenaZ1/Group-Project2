const Router = require("express").Router;
const apiRoutes = require("./apiRoutes");
const htmlRoutes = require("./htmlRoutes");
const loginRoutes = require("./loginRoutes");
const registerRoutes = require("./registerRoutes");
const postRoutes = require("./postRoutes");
const followRoutes = require("./followRoutes");

const router = new Router();

router.use("/api", apiRoutes);
router.use("", loginRoutes);
router.use("", registerRoutes);
router.use("", postRoutes);
router.use("", htmlRoutes);
router.use("", followRoutes);

module.exports = router;
