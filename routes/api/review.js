const router = require("express").Router();
const reviewController = require("../../controllers/reviewController");

// Matches with "/api/reviews"
router.route("/")
  .get(reviewController.findAll)
  .post(reviewController.create);

// Matches the reviews for a specific candidate in the database
router.route("/candrevs/:candid")
	.get(reviewController.findByCandidate);

// Matches with "/api/review/:id"
router
  .route("/:id")
  .get(reviewController.findById)
  .put(reviewController.update)
  .delete(reviewController.remove);

module.exports = router;