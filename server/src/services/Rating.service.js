const { Rating } = require('../db/models');

class RatingService {

  static async create(data) {
    return await Rating.create(data);
  }

  static async getByEmail(email) {
    return await Rating.findOne({ where: { email } });
  }
}

module.exports = RatingService;
