// config.js template

const mysql = {
  host: '',
  port: 0,
  user: '',
  password: '',
  database: 'todo_pure_js'
};

module.exports = { mysql };

/*
describe users;
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| num      | int(11)      | NO   | PRI | NULL    | auto_increment |
| name     | varchar(128) | NO   |     | NULL    |                |
| id       | varchar(128) | NO   | UNI | NULL    |                |
| password | char(41)     | NO   |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+

describe todos;
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| user_num | int(11)      | NO   |     | NULL    |                |
| text_num | int(11)      | NO   | PRI | NULL    | auto_increment |
| text     | varchar(128) | YES  |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+
*/
