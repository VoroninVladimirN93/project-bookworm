'use strict';
const bcrypt = require("bcrypt");
const saltRounds = 10;


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
      id: 1,
      email: 'vva_khv@mail.ru',
      username: 'Владимир',
      password: await bcrypt.hash('123', saltRounds),
    },
    {
      id: 2,
      email: 'user1@example.com',
      username: 'user1',
      password: await bcrypt.hash('123', saltRounds),
    },
    {
      id: 3,
      email: 'user2@example.com',
      username: 'user2',
      password: await bcrypt.hash('123', saltRounds),
    }
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};