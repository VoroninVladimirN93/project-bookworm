const { Rating } = require('../db/models');

class RatingService {

  static async create(data) {
    return await Rating.create(data);
  }

  static async readOne(id) {
    return await Rating.findAll({ where: { id } });
  }

  static async updateOne(id, data) {
    return await Rating.update({ where: { id } }, data);
  }

  static async getAll() {
    return await Rating.findAll();
  }
}

module.exports = RatingService;
