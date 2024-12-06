const router = require("express").Router();
const {
  getAllCommentController,
  createCommentController,
  deleteCommentController,
  updateCommentController,
  getAllCommentsByBookIdController,
} = require("../controllers/Comment.controller");

router
  .get("/", getAllCommentController)
  .post("/", createCommentController) 
  .delete("/:id", deleteCommentController)
  .put("/:id", updateCommentController  )
  .get("/:id", getAllCommentsByBookIdController);

module.exports = router; 






