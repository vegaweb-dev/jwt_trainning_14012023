const { urlencoded } = require('express');
const express = require('express');
const app = express();
const morgan = require('morgan');

//1)set port
//2)Middlewares
app.use(express.json());
app.use(express(urlencoded({ extended: true })));
app.use(morgan('combined'));
//3)Routes
app.use('/', require('./controllers/authController'));
//4)Connection db
//5)start server

module.exports = app;
