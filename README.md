# TODO (Pure Javascript)

순수 자바스크립트만을 이용해 제작하는 TODO,

결과보단 과정에 집중.  
아래 내용을 공부, 복습을 위해 만든 프로젝트.

- Node.JS Express
- API design
- Testing (TDD)
- MySQL Database

프론트에서의 세세한 기능이나 로그인 보안(ex. passport)은 고려하지 않고, 위 세가지에만 비중을 둬서 제작,  
서버사이드 라이브러리를 제외하고는 jQuery, template 라이브러리 (ex. ejs) 등 클라이언트 사이드에서 라이브러리 사용을 하지 않고 순수 자바스크립트로 제작.

- [Client]
  - JavaScript (~ES6)
  - HTML5/CSS3

- [Server]
  - express
  - morgan
  - [Test]
    - mocha
    - should
    - supertest

---

### TDD example

```
  Utils Test
    ✓ MySQL Connection

  [/Join] Test Suite
    - POST /add
      - SUCCESS case
        ✓ User 추가 성공
      - FAIL case
        ✓ 빈 작성란 있을 시 400 반환
        ✓ 중복된 ID시 400 반환
        ✓ 패스워드 확인 틀릴시 400 반환

  [/login] Test Suite
    - SUCCESS case
      ✓ 로그인 성공 시 302(main 페이지 리다이렉트)
    - FAIL case
      ✓ 빈칸 존재할 시 400
      ✓ 없는 아이디 일 시 400
      ✓ 틀린 패스워드 일 시 400


      ...생략
```
