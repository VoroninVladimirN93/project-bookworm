// seeders/XXXXXXXXXXXXXX-seed-books.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Books', [
      { title: 'Убить пересмешника', author: 'Харпер Ли', photo: 'http://localhost:3000/to_kill_a_mockingbird.jpg', createdAt: new Date(), updatedAt: new Date() },
      { title: '1984', author: 'Джордж Оруэлл', photo: 'http://localhost:3000/1984.jpg', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Гордость и предубеждение', author: 'Джейн Остин', photo: 'http://localhost:3000/pride_and_prejudice.jpg', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Великий Гэтсби', author: 'Ф. Скотт Фицджеральд', photo: 'http://localhost:3000/the_great_gatsby.jpg', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Сто лет одиночества', author: 'Габриэль Гарсиа Маркес', photo: 'http://localhost:3000/one_hundred_years_of_solitude.jpg', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Моби Дик', author: 'Герман Мелвилл', photo: 'http://localhost:3000/moby_dick.jpg', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Война и мир', author: 'Лев Толстой', photo: 'http://localhost:3000/war_and_peace.jpg', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Одиссея', author: 'Гомер', photo: 'http://localhost:3000/the_odyssey.jpg', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Преступление и наказание', author: 'Фёдор Достоевский', photo: 'http://localhost:3000/crime_and_punishment.jpg', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Над пропастью во ржи', author: 'Джером Д. Сэлинджер', photo: 'http://localhost:3000/the_catcher_in_the_rye.jpg', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {});
  }
};