// mysql connection settings
const mysql = require("mysql");
const config = require("../../config/config.js");
const connection = mysql.createConnection(config.mysql);

let num = 0;

const getTodos = (req, res) => {
  num = req.query.num;

  connection.query(`select * from todos where user_num=${num}`, (err, rows) => {
    if (!rows.length) {
      res.json([]);
    } else {
      res.json(rows);
    }
  });
};

const addTodo = (req, res) => {
  const { userNum, textValue } = req.body;

  connection.query(
    `insert into todos set ?`,
    { user_num: userNum, text: textValue },
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        res.sendStatus(400);
      }
    }
  );
};

const editTodo = (req, res) => {
  const {text_num, text} = req.body;
  connection.query(`update todos set text="${text}" where text_num=${text_num}`, (err, rows) =>{
    if(err){
      res.sendStatus(400);
    } else {
      res.end();
    }
  })
};

const deleteTodo = (req, res) => {
  const textNum = req.body.key;
  connection.query(`delete from todos where text_num=${textNum}`, (err, rows)=>{
    if(err){
      res.sendStatus(400);
    }else {
      res.end();
    }
  })
};



module.exports = {
  getTodos, addTodo, editTodo, deleteTodo
}
