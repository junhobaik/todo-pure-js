const express = require("express");
const router = express.Router();

// mysql connection settings
const mysql = require("mysql");
const config = require("../../config/config.js");
const connection = mysql.createConnection(config.mysql);

let num = 0;

router.post("/user", (req, res) => {
  num = req.query.num;

  connection.query(`select * from todos where user_num=${num}`, (err, rows) => {
    if (!rows.length) {
      res.json([]);
    } else {
      res.json(rows);
    }
  });
});

router.post("/add", (req, res) => {
  const { newTodo } = req.body;

  connection.query(
    `insert into todos set ?`,
    { user_num: num, text: newTodo },
    (err, rows) => {
      if (!err) {
        res.redirect('/main?num='+num);
      } else {
        res.sendStatus(400);
      }
    }
  );
});

module.exports = router;
