const router = require("express").Router();
const jobreqController = require("../../controllers/jobreqController");

// Matches with "/api/jobreqs"
router.route("/")
  .get(jobreqController.findAll)
  .post(jobreqController.create);

router.route("/openreqs/:mgrid")
	.get(jobreqController.findByMgr);

router
  .route("/:id")
  .get(jobreqController.findById)
  .put(jobreqController.update)
  .delete(jobreqController.remove);

module.exports = router;