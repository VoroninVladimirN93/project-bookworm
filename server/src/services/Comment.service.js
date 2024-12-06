const { Comment, User } = require("../db/models");


class CommentService {
  static async getAllComment() {
    try {
      const comments = await Comment.findAll({
        order: [["id", "ASC"]], // Сортировка по ID, от старого к новому
      });

      // Преобразуем результат в нужный формат
      return comments
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getAllCommentsByBookId(book_id) {
    try {
      const comments = await Comment.findAll({
        where: {
          book_id: book_id, // или просто book_id, если переменная уже имеет такое имя
        }
      });
      return comments;
    } catch (error) {
      throw new Error(error.message);
    }
  }
 
  static async createComment(data) {
    try {
      const comment = await Comment.create(data);
      return comment;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  
  static async deleteComment(id) {
    try {
      const countDeletedComments = await Comment.destroy({
        where: { id },
      });
      return countDeletedComments;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateComment(data, id) {
    try {
      const [countUpdated] = await Comment.update(data, { where: { id } });
      return countUpdated;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getOneComment(id) {
    try {
      const comment = await Comment.findByPk(id);
      if (!comment) {
        throw new Error("Comment not found");
      }
      return comment;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = CommentService;
