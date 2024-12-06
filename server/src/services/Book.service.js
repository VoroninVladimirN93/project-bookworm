const { Book, User, Rating, Favorites, Comment} = require('../db/models');

class BookService {
    static async getAll() {
        return await Book.findAll({
            include: [{model: Rating} , {model: Favorites} , {model: Comment}],
        })
    }


    static async getById(id) {
        console.log('<<<<<<<<<',id);
        
        return await Book.findOne({
            where:{ id }, include: [{model: Rating} , {model: Favorites} , {model: Comment}],
        } )
    }


    static async create(data) {
        const newBook = await Book.create(data);
        return await this.getById(newBook.id)
    }

    static async update(id, data) {
        console.log(data);
        
        console.log(id);
        
        
        const book = await this.getById(id);
        console.log(book);
        
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