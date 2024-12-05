// seeders/XXXXXXXXXXXXXX-seed-favorites.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Favorites', [
      { user_id: 1, book_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 3, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 4, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 5, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 3, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, book_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, book_id: 2, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 3, book_id: 3, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Favorites', null, {});
  }
};