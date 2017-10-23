const router = require("express").Router();
const managerRoutes = require("./manager");
const candidateRoutes = require("./candidate");
const reviewRoutes = require("./review");
const jobreqRoutes = require("./jobreq");
const allcandRoutes = require("./allcand");
const textract = require("textract");

// routes

router.use("/manager", managerRoutes);
router.use("/candidate", candidateRoutes);
router.use("/review", reviewRoutes);
router.use("/jobreq", jobreqRoutes);
router.use("/allcand", allcandRoutes);
router.use("/resume", textractRoutes);

module.exports = router;
