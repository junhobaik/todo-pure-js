const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const mysql = require('mysql'); 
const morgan = require('morgan');

const login = require('./api/login');
const join = require('./api/join');
const main = require('./api/main');

app.use(express.static('api'));
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/api/index.html");
})

app.use('/login', login);

module.exports = app;
