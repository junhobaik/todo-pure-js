const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");

const login = require("./api/login");
const join = require("./api/join");
const main = require("./api/main");

app.use(express.static("api"));
if(process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/api/index.html");
});

/*Development Codes************************** */
const mysql = require("mysql");
const config = require("./config/config.js");
const connection = mysql.createConnection(config.mysql);

app.get("/getall", (req, res) => {
  const query = connection.query("select * from users", function(err, rows) {
    res.send(rows);
  });
});

app.get("/deleteall", (req, res) => {
  const query = connection.query("truncate table users", function(err, rows) {
    res.end();
  });
  connection.query("truncate table todos", function(err, rows) {
    res.end();
  });
});
/**************************************** */

app.use("/login", login);
app.use("/join", join);
app.use("/main", main);

module.exports = app;
