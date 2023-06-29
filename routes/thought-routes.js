const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
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

// Set up POST and DELETE at /thoughts/:id/reactions
router.route("/:id/reactions").post(addReaction).delete(removeReaction);

module.exports = router;
