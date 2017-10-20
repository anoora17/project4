const router = require("express").Router();
const resumeController = require("../../controllers/resumeController");

// Matches with "/api/resume"
router.route("..")
  .post(resumeController.create);

// Matches with "/api/manager/:id"
// router
//   .route("/:id")
//   .get(resumeController.findById)
//   .put(resumeController.update)
//   .delete(resumeController.remove);

module.exports = router;