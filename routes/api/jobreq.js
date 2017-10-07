const router = require("express").Router();
const jobreqController = require("../../controllers/jobreqController");

// Matches with "/api/books"
router.route("/")
  .get(jobreqController.findAll)
  .post(jobreqController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(jobreqController.findById)
  .put(jobreqController.update)
  .delete(jobreqController.remove);

module.exports = router;