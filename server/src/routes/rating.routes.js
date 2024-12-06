const router = require('express').Router();
const RatingController = require('../controllers/Rating.controller');
const verifyAccessToken = require('../middleware/verifyAccessToken');

router
  
  .get('/', RatingController.getAllController)

  
  // .get('/:id', RatingController.getRatingById)

  
  // .post('/', verifyAccessToken, RatingController.createRating)

 
  // .put('/:id', verifyAccessToken, RatingController.updateRating)

  
  // .delete('/:id', verifyAccessToken, RatingController.deleteRating);

module.exports = router;
