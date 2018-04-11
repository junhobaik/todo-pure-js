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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/api/index.html");
})

app.use('/login', login);
app.use('/join', join);
app.use('/main', main);

module.exports = app;
