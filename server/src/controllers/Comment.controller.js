const CommentService = require("../services/Comment.service");

exports.getAllCommentController = async (req, res) => {
  try {
    const comment = await CommentService.getAllComment();
    res.status(200).json({ message: "success", comment });
  } catch (error) {
    res.status(500).json({ message: error.message, comment: [] });
  }
};

exports.getAllCommentsByBookIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await CommentService.getAllCommentsByBookId(id);
    res.status(200).json({ message: "success", comment });
  } catch (error) {
    res.status(500).json({ message: error.message, comment: {} });
  }
};

exports.createCommentController = async (req, res) => {
  const { id } = req.params;
  const { text,user_id,
    book_id } = req.body;
  if (!text || text.trim() === "") {
    res.status(400).json({ message: "Нельзя отправить пустой комментарий" });
    return;
  }
  try {
    const comment = await CommentService.createComment({
      text,user_id,
    book_id ,
    });
    res.status(200).json({ message: "success", comment });
  } catch (error) {
    res.status(500).json({ message: error.message, comment: {} });
  }
};

exports.deleteCommentController = async (req, res) => {
  const { id } = req.params;

  try {
    const countDeletedCategories = await CommentService.deleteComment(id);
    if (countDeletedCategories > 0) {
      res.status(200).json({ message: "success" });
    } else {
      res.status(400).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCommentController = async (req, res) => {
  const { text } = req.body;
  const { id } = req.params;
  if (!text || text.trim() === "") {
    res.status(400).json({ message: "Данные пустые" });
    return;
  }
  try {
    const countUpdated = await CommentService.updateComment(req.body, id);

    if (countUpdated > 0) {
      const comment = await CommentService.getOneComment(id);

      res.status(200).json({ message: "success", comment });
    } else {
      res.status(200).json({ message: "fail" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message, comment: {} });
  }
};
