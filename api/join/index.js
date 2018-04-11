const express = require("express");
const router = express.Router();

// mysql connection settings
const mysql = require("mysql");
const config = require("../../config/config.js");
const connection = mysql.createConnection(config.mysql);

router.get("/", (req, res) => {
  res.sendFile("./index.html");
});

router.post("/add", (req, res) => {
  const { name, id, password, passwordCheck } = req.body;

  const query = connection.query(
    "insert into users set ?",
    { name, id, password },
    function(err, rows) {
      res.redirect("/login");
    }
  );
});

module.exports = router;
