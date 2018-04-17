const express = require("express");
const router = express.Router();
const ctrl = require("./index.ctrl.js");

router.post("/add", ctrl.addUser);

module.exports = router;
