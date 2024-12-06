const BookService = require('../services/Book.service');
const isValidId = require('../utils/isValidId');
const BookValidator = require('../utils/Book.validator');
const formatResponse = require('../utils/formatResponse');
const reformatId = require('../utils/reformatId');



class BookController {
    static async getAllBooks(req, res) {
        try {
            const books = await BookService.getAll();
            if (books.length === 0) {
                return res.status(200).json(formatResponse(200, 'No books found', []));
            }


            res.status(200).json(formatResponse(200, 'seccess', books));
        } catch ({message}) {
            console.error(message);
            res 
               .status(500)
               .json(formatResponse(500, 'Internal server error', null, message));
            
         }
        }

        static async getBookById(req, res) {
            const { id } =req.params
            if (!isValidId(id)) {
                return res.status(400).json(formatResponse(400, 'Invalid book ID'));
            }

            try {
                const book = await BookService.getById(reformatId(id));
                if(!book) {
                    return res 
                    .status(404)
                    .json(formatResponse(404, `Book with id ${id} not found`))
                }

                res.status(200).json(formatResponse(200, 'seccess', book));
            } catch ({message}) {
                console.error(message);
                res
                    .status(500)
                    .json(formatResponse(500,  'Invalid server error', null, message))
            }
        }

        static async createBook(req, res) {
            const { author, photo, title } = req.body;
            const { isValid, error } = BookValidator.validate({ author, title, photo });
            if(!isValid) {
                return res 
                    .status(400)
                    .json(formatResponse(400, 'Validation error', null, error));
            }

            try {
                const newBook = await BookService.create({
                    author,
                    title,
                    photo
                });
                
                if(!newBook) {
                    return res 
                        .status(400)
                        .json(formatResponse(400, `Failed to create new book`));
                }
                res.status(201).json(formatResponse(201, 'seccess', newBook))
            } catch ({message}) {
                console.error(message);
                res 
                    .status(500)
                    .json(formatResponse(500, 'Invalid server error', null, message))
            }
        }

        static async updateBook(req, res) {
            const { id } = req.params;
            console.log(id);
            
            const { author, title, photo  } = req.body;


            if(!isValidId(id)) {
                return res.status(400).json(formatResponse(400, 'Invalid book ID'))
            }

            const { isValid, error } = BookValidator.validate({ author, title, photo  })
            if (!isValid) {
                return res 
                    .status(400)
                    .json(formatResponse(400, 'Validation error', null, error));
            }


            try {
                const bookToUpdate = await BookService.getById(+id)
                if(bookToUpdate) 
                {const updateBook = await BookService.update(+id, {author, photo, title})
                if (!bookToUpdate) {
                    return res
                      .status(404)
                      .json(formatResponse(404, `Book with id ${id} not found`));
                  }
            
                  res.status(200).json(formatResponse(200, 'success', updateBook));}
            } catch ({message}) {
                console.error(message);
                res
                    .status(500)
                    .json(formatResponse(500, 'Internal server error', null, message));
                
            }
        }

        static async deleteBook(req, res) {
            const { id } = req.params;

            if(!isValidId(id)) {
                return res.status(400).json(formatResponse(400, 'Invalid book ID'))
            }
        
            try {
                const bookToDelete = await BookService.getById(+id);

      
      if (!bookToDelete) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              `No rights to delete book with id ${id}`,
              null,
              `No rights to delete book with id ${id}`
            )
          );
      }
      
      const deletedBook = await BookService.delete(reformatId(id));

      
      if (!deletedBook) {
        return res
          .status(404)
          .json(formatResponse(404, `Book with id ${id} not found`));
      }

      
      res.status(200);
      res
        .status(200)
        .json(
          formatResponse(
            200,
            `Book with id ${id} successfully deleted`,
            deletedBook
          )
        );
    } catch ({message}) {
        console.error(message);
        res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
            
    
    }
    }
}

module.exports = BookController;
