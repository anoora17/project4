const router = require("express").Router();
const candidateController = require("../../controllers/candidateController");

// Matches with "/api/candidate"
router.route("/")
  .get(candidateController.find);
  

module.exports = router;