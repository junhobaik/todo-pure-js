const express = require("express");
const router = express.Router();
const ctrl = require("./index.ctrl.js");

router.post("/user", ctrl.getTodos);

router.post("/add", ctrl.addTodo);

router.post("/edit", ctrl.editTodo);

router.post("/delete", ctrl.deleteTodo);

module.exports = router;
