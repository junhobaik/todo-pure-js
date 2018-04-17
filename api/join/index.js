const express = require("express");
const router = express.Router();

// mysql connection settings
const mysql = require("mysql");
const config = require("../../config/config.js");
const connection = mysql.createConnection(config.mysql);
const ctrl = require("./index.ctrl.js");

router.post("/add", ctrl.add);

module.exports = router;
