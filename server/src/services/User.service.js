const { User } = require('../db/models');

class UserService {

  static async create(data) {
    return await User.create(data);
  }

  static async getByEmail(email) {
    return await User.findOne({ where: { email } });
  }
  static async getByPhone(phone) {
    return await User.findOne({ where: { phone } });
  }
}

module.exports = UserService;
