// seeders/XXXXXXXXXXXXXX-seed-users.js
'use strict';

const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'Владимир',
        email: 'user1@example.com',
        phone: '1234567890',
        password: await bcrypt.hash('123', saltRounds),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Никита',
        email: 'user2@example.com',
        phone: '0987654321',
        password: await bcrypt.hash('123', saltRounds),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Расул',
        email: 'user3@example.com',
        phone: '1122334455',
        password: await bcrypt.hash('123', saltRounds),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};