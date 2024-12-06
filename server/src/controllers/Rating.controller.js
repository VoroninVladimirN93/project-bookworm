const RatingService = require("../services/Rating.service");
const formatResponse = require("../utils/formatResponse");

class RatingController {
  static async getAllRating(req, res) {
    try {
      const allRating = await RatingService.getAll();
      res
        .status(200)
        .json(formatResponse(200, "Get all ratings done", allRating, null));
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, err.message));
    }
  }

  static async createRating(req, res) {
    try {
      const { user_id, book_id, rating } = req.body;
      const setRating = await RatingService.create({
        user_id,
        book_id,
        rating,
      });
      res
        .status(201)
        .json(formatResponse(201, `Rating set ${rating}`, setRating, null));
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, err.message));
    }
  }

  static async updateRating(req, res) {
    try {
      const { user_id, book_id, rating } = req.body;
  
      const updatedRating = await RatingService.updateOne({
        user_id,
        book_id,
        rating,
      });
      res
        .status(200)
        .json(formatResponse(200, `Rating updated to ${rating}`, updatedRating, null));
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, err.message));
    }
  }

  static async deleteRating(req, res) {
    try {
      const { id } = req.params; 

      const deletedRating = await RatingService.deleteOne(+id);

      if (!deletedRating) {
        return res.status(404).json(formatResponse(404, "Rating not found", null, null));
      }

      res
        .status(200)
        .json(formatResponse(200, "Rating deleted successfully", deletedRating, null));
    } catch (err) {
      console.error(err.message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, err.message));
    }
  }
}

module.exports = RatingController;
