// seeders/XXXXXXXXXXXXXX-seed-ratings.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Ratings', [
      { user_id: 1, book_id: 1, rating: 9, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 1, rating: 10, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 2, rating: 9, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 2, rating: 10, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 3, rating: 9, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 3, rating: 10, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 4, rating: 9, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 4, rating: 10, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 5, rating: 9, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 5, rating: 10, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 6, rating: 9, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 6, rating: 10, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 7, rating: 9, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 7, rating: 10, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 8, rating: 9, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 8, rating: 10, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 9, rating: 9, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 9, rating: 10, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 10, rating: 9, createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 10, rating: 10, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ratings', null, {});
  }
};