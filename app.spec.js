const app = require("./app.js");

const request = require("supertest");
const should = require("should");

describe("Utils Test", () => {
  const mysql = require("mysql");
  const config = require("./config/config.js");
  const connection = mysql.createConnection(config.mysql);

  it("MySQL Connection", done => {
    connection.connect(function(err) {
      if (err) {
        throw(res);
      } else {
        done();
      }
    });
  });
});
