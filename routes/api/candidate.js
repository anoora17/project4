const router = require("express").Router();
const candidateController = require("../../controllers/candidateController");

// Matches with "/api/books"
router.route("/")
  .get(candidateController.findAll)
  .post(candidateController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(candidateController.findById)
  .put(candidateController.update)
  .delete(candidateController.remove);

module.exports = router;