const router = require("express").Router();
const managerController = require("../../controllers/managerController");

// Matches with "/api/manager"
router.route("/")
  .get(managerController.findAll)
  .post(managerController.create);

 router.route("/email/:email")
 	.get(managerController.findByEmail);

// Matches with "/api/manager/:id"
router
  .route("/:id")
  .get(managerController.findById)
  .post(managerController.update)
  .put(managerController.update)
  .delete(managerController.remove);

module.exports = router;