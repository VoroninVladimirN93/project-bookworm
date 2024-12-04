require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const removeHTTPHeader = require('../middleware/removeHeader');


const { CLIENT_URL } = process.env;


const corsConfig = {
  origin: [CLIENT_URL,],
  credentials: true,
};

const serverConfig = (app) => {
  app.use(express.urlencoded({ extended: true }));

  app.use(express.json());

  app.use(morgan('dev'));

  app.use(cookieParser());

  app.use(cors(corsConfig));

  app.use(removeHTTPHeader);

  app.use(
    '/static/images',
    express.static(path.resolve(__dirname, '..', 'public', 'images'))
  );
};

module.exports = serverConfig;
