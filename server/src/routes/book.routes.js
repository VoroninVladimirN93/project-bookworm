const router = require('express').Router();
const BookController = require('../controllers/Book.controller');
const verifyAccessToken = require('../middleware/verifyAccessToken');

router
  
  .get('/', BookController.getAllBooks)

  
  .get('/:id', BookController.getBookById)

  
  // .post('/', verifyAccessToken, BookController.createBook)

 
  .put('/:id', verifyAccessToken, BookController.updateBook)

  
  .delete('/:id', BookController.deleteBook)


  .post('/', BookController.createBook)

 
  // .put('/:id', BookController.updateBook)

  
  // .delete('/:id', BookController.deleteBook);

module.exports = router;
