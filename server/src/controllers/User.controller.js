const bcrypt = require('bcrypt');
const UserService = require('../services/User.service');
const formatResponse = require('../utils/formatResponse');
const UserValidator = require('../utils/User.validator');
const cookiesConfig = require('../config/cookiesConfig');
const generateTokens = require('../utils/generateTokens');

class UserController {
  static async refreshTokens(req, res) {
    try {
      const { user } = res.locals;

      const { accessToken, refreshToken } = generateTokens({ user });
      res.status(200)
        .cookie('refreshToken', refreshToken, cookiesConfig) 
        .json(
          formatResponse(200, 'New tokens have been successfully generated', {
            user,
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
    const { email, username, password, phone } = req.body;
    console.log(email, 1111, phone, 111, password, 111, username);
    const { isValid, error } = UserValidator.validateSignUp({
      email,
      username,
      password,
      phone,
    });

    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation error', null, error));
    }

    const normalizedEmail = email ? email.toLowerCase() : null;

    try {
// is there such an email
      const userFoundByEmail = email && (await UserService.getByEmail(normalizedEmail));
      if (userFoundByEmail) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              'A user with this email already exists',
              null,
              'A user with this email already exists'
            )
          );
      }

// is there such an email
      const userFoundByPhone = phone && (await UserService.getByPhone(phone));
      if (userFoundByPhone) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              'A user with this phone number already exists',
              null,
              'A user with this phone number already exists'
            )
          );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await UserService.create({
        email: normalizedEmail,
        username,
        password: hashedPassword,
        phone,
      });

      const plainUser = newUser.get({ plain: true });
      delete plainUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      res
        .status(201)
        .cookie('refreshToken', refreshToken, cookiesConfig) 
        .json(
          formatResponse(201, 'Registration was successful', {
            user: plainUser,
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
    const { email, phone, password } = req.body;

    const { isValid, error } = UserValidator.validateSignIn({email,
      phone,
      password,
    });

    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation error', null, error));
    }

    try {
      const normalizedEmail = email ? email.toLowerCase() : null;

// Search by email or phone
      const user =
        (email && (await UserService.getByEmail(normalizedEmail))) ||
        (phone && (await UserService.getByPhone(phone)));

      if (!user) {
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              'The user with the same email or phone number was not found',
              null,
              'The user with the same email or phone number was not found'
            )
          );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);if (!isPasswordValid) {
        return res
          .status(401)
          .json(
            formatResponse(401, 'Invalid password.', null, 'Invalid password.')
          );
      }

      const plainUser = user.get({ plain: true });
      delete plainUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      res
        .status(200)
        .cookie('refreshToken', refreshToken, cookiesConfig) 
        .json(
          formatResponse(200, 'The login was completed successfully', {
            user: plainUser,
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
    try {
      res
        .clearCookie('refreshToken') 
        .json(formatResponse(200, 'The logout was completed successfully'));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }
}

module.exports = UserController;
