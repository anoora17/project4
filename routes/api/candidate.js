const router = require("express").Router();
const candidateController = require("../../controllers/candidateController");

// Matches with "/api/candidate"
router.route("/")
  .get(candidateController.findAll)
  .post(candidateController.create);

router.route("/txtSearch/:text")

	.get(candidateController.find);

router.route("/txtSearch/:restext")

	.put(candidateController.update);
// Matches with "/api/candidate/:id"
router
  .route("/:id")
  .get(candidateController.findById)
  .put(candidateController.update)
  .delete(candidateController.remove);

module.exports = router;
