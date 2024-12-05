// models/favorites.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorites extends Model {
    static associate(models) {
      Favorites.belongsTo(models.User, { foreignKey: 'user_id' });
      Favorites.belongsTo(models.Book, { foreignKey: 'book_id' });
    }
  }
  Favorites.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Favorites',
  });
  return Favorites;
};