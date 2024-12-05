const { Book, User } = require('../db/models');

class BookService {
    static async getAll() {
        return await Book.findAll({
            include: [{model: User}],
        })
    }


    static async getById(id) {
        return await Book.findOne({
            where:{ id },
            include: [{ model: User }],
        })
    }


    static async create(data) {
        const newBook = await Book.create(data);
        return await this.getById(newBook.id)
    }

    static async update(id, data) {
        const book = await this.getById(id);
        if(book) {
            book.author = data.author;
            book.title = data.title
            book.photo = data.photo
            await book.save()
        }
        return book;
    }



    static async delete(id) {
        const book = await this.getById(id)
        if(book) {
            await book.destroy();
        }
        return book;
    }
}

module.exports = BookService;