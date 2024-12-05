const { Rating } = require('../db/models');

class RatingService {

  static async create(data) {
    return await Rating.create(data);
  }

  static async readOne(id) {
    return await Rating.findAll({ where: { id } });
  }

  static async updateOne(id) {
    return await Rating.update({ where: { id } });
  }
}

module.exports = RatingService;
