const express = require('express'); 
const router = express.Router();

// mysql connection settings
const mysql = require('mysql');
const config = require('../../config/config.js');
const connection = mysql.createConnection(config.mysql);

router.get('/', (req, res) => {
  res.sendFile("./index.html");
})

module.exports = router;
