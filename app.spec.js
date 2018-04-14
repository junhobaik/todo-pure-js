const app = require("./app.js");

const request = require("supertest");
const should = require("should");

const mysql = require("mysql");
const config = require("./config/config.js");
const connection = mysql.createConnection(config.mysql);

describe("Utils Test", () => {
  it("MySQL Connection", done => {
    connection.connect(function(err) {
      if (err) {
        throw err;
      } else {
        done();
      }
    });
  });
});

describe("[/Join] Test Suite", () => {
  describe("- POST /add", () => {
    const testUser = {
      name: "홍길동 TEST",
      id: "mrhong",
      password: "abc123",
      passwordCheck: "abc123"
    };
    beforeEach("테스트 DB POST 요청", done => {
      request(app)
        .post("/join/add")
        .send(testUser)
        .expect(302)
        .end(done);
    });

    afterEach(done => {
      connection.query(
        `delete from users where name="${testUser.name}"`,
        (err, rows) => {
          done();
        }
      );
    });

    describe("- SUCCESS case", () => {
      it("User 추가 성공", () => {
        connection.query(
          `select * from users where name="${testUser.name}"`,
          (err, rows) => {
            rows[0].should.have.property("name", testUser.name);
          }
        );
      });
    });

    describe("- FAIL case", () => {
      it("빈 작성란 있을 시 400 반환", done => {
        request(app)
          .post("/join/add")
          .send({ id: "", ...testUser })
          .expect(400)
          .end(done);
      });
      it("중복된 ID시 400 반환", done => {
        request(app)
          .post("/join/add")
          .send(testUser)
          .expect(400)
          .end(done);
      });
      it("패스워드 확인 틀릴시 400 반환", done => {
        request(app)
          .post("/join/add")
          .send({ ...testUser, passwordCheck: `${testUser.passwordCheck}a` })
          .expect(400)
          .end(done);
      });
    });
  });
});

describe("[/login] Test Suite", () => {
  const testUser = {
    name: "홍길동 TEST",
    id: "mrhong",
    password: "abc123",
    passwordCheck: "abc123"
  };
  const { id, password } = testUser;
  before("테스트 DB Insert", done => {
    request(app)
      .post("/join/add")
      .send(testUser)
      .expect(302)
      .end(done);
  });
  after("테스트 DB Insert 했던 것 Delete", done => {
    connection.query(
      `delete from users where name="${testUser.name}"`,
      (err, rows) => {
        done();
      }
    );
  });

  describe("- SUCCESS case", () => {
    it("로그인 성공 시 302(main 페이지 리다이렉트)", done => {
      request(app)
        .post("/login/connect")
        .send({ id, password })
        .expect(302)
        .end(done);
    });
  });

  describe("- FAIL case", () => {
    it("빈칸 존재할 시 400", done => {
      request(app)
        .post("/login/connect")
        .send({ id, password: "" })
        .expect(400)
        .end(done);
    });
    it("없는 아이디 일 시 400", done => {
      request(app)
        .post("/login/connect")
        .send({ id: "a1b1c26wage99", password })
        .expect(400)
        .end(done);
    });
    it("틀린 패스워드 일 시 400", done => {
      request(app)
        .post("/login/connect")
        .send({ id, password: `${password}a` })
        .expect(400)
        .end(done);
    });
  });
});

describe("[/main] Test Suite", () => {
  describe("- POST /add", () => {
    describe("- SUCCESS case", () => {
      it("TODO 추가 성공 302(/main?num=...)", done => {
        request(app)
          .post("/main/add")
          .send({ user_num: 0, newTodo: "INSERT TESTING" })
          .expect(302)
          .end((err, res) => {
            connection.query(
              'select * from todos where user_num=0 and text="INSERT TESTING"',
              (err, rows) => {
                if (!err && rows.length) {
                  done();
                } else {
                  throw err;
                }
              }
            );
          });
      });
    });
  });

  describe("- UPDATE /update", () => {
    describe("- SUCCESS case", () => {});
    describe("- FAIL case", () => {});
  });

  describe("- DELETE /delete", () => {
    let lastTextNum;
    before("테스트 DB 추가 및 todos table length 찾기", done => {
      connection.query("select * from todos", (err, rows) => {
        lastTextNum = parseInt(rows[rows.length - 1].text_num);
        done();
      });
    });

    describe("- SUCCESS case", () => {
      it("TODO 삭제 성공", done => {
        request(app)
          .post("/main/delete")
          .send({ key: lastTextNum })
          .end((err, res) => {
            connection.query(
              `select * from todos where text_num=${lastTextNum}`,
              (err, rows) => {
                rows.should.have.length(0);
                done();
              }
            );
          });
      });
    });
    describe("- FAIL case", () => {
      it("key값 (text_num) 이 없을때 400 반환", done => {
        request(app)
        .post("/main/delete")
        .send({})
        .expect(400)
        .end(done);
      });
    });
  });
});
