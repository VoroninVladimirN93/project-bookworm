// models/book.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.hasMany(models.Comment, { foreignKey: 'book_id' });
      Book.hasMany(models.Rating, { foreignKey: 'book_id' });
      Book.hasMany(models.Favorites, { foreignKey: 'book_id' });
    }
  }
  Book.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};