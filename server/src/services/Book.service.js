const { Book, User, Rating, Favorites, Comment } = require("../db/models");

class BookService {
  static async getAll() {
    return await Book.findAll({
      include: [
        { model: Rating },
        { model: Favorites },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });
  }

  static async getById(id) {
    return await Book.findOne({ 
      where: { id },
      include: [
        { model: Rating },
        { model: Favorites },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });
 } 


  static async getById_for_search(id) {
    return await Book.findOne({ where : {id}}
)}
  


  static async create(data) {
    const newBook = await Book.create(data);
    return await this.getById_for_search(newBook.id);
  }

  static async update(id, data) {


    const book = await this.getById(id);
    console.log(book);

    if (book) {
      book.author = data.author;
      book.title = data.title;
      book.photo = data.photo;
      await book.save();
    }
    return book;
  }

  static async delete(id) {
    const book = await this.getById_for_search(id);
    if (book) {
      await book.destroy();
    }
    return book;
  }
}

module.exports = BookService;
