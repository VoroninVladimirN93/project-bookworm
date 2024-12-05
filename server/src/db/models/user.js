// models/user.js
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Comment, { foreignKey: 'user_id' });
      User.hasMany(models.Rating, { foreignKey: 'user_id' });
      User.hasMany(models.Favorites, { foreignKey: 'user_id' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      defaultValue: '',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      defaultValue: '',
    },
    phone: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: '',
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};