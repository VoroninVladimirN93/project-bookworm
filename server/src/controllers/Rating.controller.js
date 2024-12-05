const bcrypt = require('bcrypt');
const RatingService = require('../services/Rating.service');
const formatResponse = require('../utils/formatResponse');
const RatingValidator = require('../utils/Rating.validator');
const cookiesConfig = require('../config/cookiesConfig');
const generateTokens = require('../utils/generateTokens');

class RatingController {


static async createController (req,res) {
  try {
     const {rating} = req.body
  }  catch ({ message }) {
    console.error(message);
    res
      .status(500)
      .json(formatResponse(500, 'Internal server error', null, message));
  }
}

static async updateController (req,res) {
  try {
    
  }  catch ({ message }) {
    console.error(message);
    res
      .status(500)
      .json(formatResponse(500, 'Internal server error', null, message));
  }
}

static async deleteController (req,res) {
  try {
    
  }  catch ({ message }) {
    console.error(message);
    res
      .status(500)
      .json(formatResponse(500, 'Internal server error', null, message));
  }
}

  static async refreshTokens(req, res) {
    try {

      const { rating } = res.locals;

      const { accessToken, refreshToken } = generateTokens({ rating });
      res.status(200).cookie('refreshToken', refreshToken, cookiesConfig).json(
        formatResponse(200, 'Successfully generated new tokens', {
          rating,
          accessToken,
        })
      );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async signUp(req, res) {
    const { email, ratingname, password } = req.body;

    const { isValid, error } = RatingValidator.validateSignUp({
      email,
      ratingname,
      password,
    });

    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation error', null, error));
    }

    const normalizedEmail = email.toLowerCase();

    try {
      const ratingFound = await RatingService.getByEmail(normalizedEmail);

      if (ratingFound) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              'A rating with this email already exists',
              null,
              'A rating with this email already exists'
            )
          );
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newRating = await RatingService.create({
        email: normalizedEmail,
        ratingname,
        password: hashedPassword,
      });

      const plainRating = newRating.get({ plain: true });
      delete plainRating.password;

      const { accessToken, refreshToken } = generateTokens({ rating: plainRating });
      res
        .status(201)
        .cookie('refreshToken', refreshToken, cookiesConfig)
        .json(
          formatResponse(201, 'Login successful', {
            rating: plainRating,
            accessToken,
          })
        );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async signIn(req, res) {
    const { email, password } = req.body;

    const { isValid, error } = RatingValidator.validateSignIn({
      email,
      password,
    });

    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation error', null, error));
    }

    const normalizedEmail = email.toLowerCase();

    try {

      const rating = await RatingService.getByEmail(normalizedEmail);

      if (!rating) {
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              'Rating with this email not found',
              null,
              'Rating with this email not found'
            )
          );
      }

      const isPasswordValid = await bcrypt.compare(password, rating.password);

      if (!isPasswordValid) {
        return res
          .status(401)
          .json(
            formatResponse(401, 'Invalid password.', null, 'Invalid password.')
          );
      }

      const plainRating = rating.get({ plain: true });
      delete plainRating.password;

      const { accessToken, refreshToken } = generateTokens({ rating: plainRating });
      res
        .status(200)
        .cookie('refreshToken', refreshToken, cookiesConfig)
        .json(
          formatResponse(200, 'Login successful', {
            rating: plainRating,
            accessToken,
          })
        );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }

  static async signOut(req, res) {
    console.log(req.cookies);
    try {
      res
        .clearCookie('refreshToken')
        .json(formatResponse(200, 'Logout successful'));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }
}

module.exports = RatingController;
