// mysql connection settings
const mysql = require("mysql");
const config = require("../../config/config.js");
const connection = mysql.createConnection(config.mysql);

const addUser = (req, res) => {
  const { name, id, password, passwordCheck } = req.body;

  if (name === "" || id === "" || password === "" || passwordCheck === "") {
    res.sendStatus(400);
  } else if (password !== passwordCheck) {
    res.sendStatus(400);
  } else {
    const query = connection.query(
      "insert into users set ?",
      { name, id, password },
      function(err, rows) {
        if (!err) {
          res.redirect("/login");
        } else {
          res.sendStatus(400);
        }
      }
    );
  }
};

module.exports = { addUser };
