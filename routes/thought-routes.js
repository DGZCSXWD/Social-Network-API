const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} = require("../controller/thought-controller");

// Set up GET all at /thoughts
router.route("/").get(getAllThoughts);

// Set up GET one, Post, PUT, and DELETE at /thoughts/:id
router
  .route("/:id")
  .get(getThoughtById)
  .post(createThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
