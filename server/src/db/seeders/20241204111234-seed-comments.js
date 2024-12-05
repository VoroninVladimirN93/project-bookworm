// seeders/XXXXXXXXXXXXXX-seed-comments.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', [
      { user_id: 1, book_id: 1, text: 'Вечная классика!', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 1, text: 'Одна из моих любимых книг.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 2, text: 'Холодный антиутопический шедевр.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 2, text: 'Видение Оруэлла жутко пророческое.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 3, text: 'Остин несравненна.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 3, text: 'Очаровательное чтение.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 4, text: 'Гэтсби — трагическая фигура.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 4, text: 'Эпоха джаза оживает.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 5, text: 'Магический реализм в лучшем виде.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 5, text: 'Семейная сага, как никогда.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 6, text: 'История о ките!', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 6, text: 'Проза Мелвилла мощная.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 7, text: 'Эпос человеческого опыта.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 7, text: 'Проницательность Толстого глубока.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 8, text: 'Путешествие эпических масштабов.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 8, text: 'Поэзия Гомера вечна.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 9, text: 'Психологическая глубина Достоевского несравненна.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 9, text: 'Напряженная история о преступлении и покаянии.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 1, book_id: 10, text: 'Хоулден Колфилд незабываем.', createdAt: new Date(), updatedAt: new Date() },
      { user_id: 2, book_id: 10, text: 'История взросления, которая трогает.', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};