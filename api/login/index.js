const express = require('express'); 
const router = express.Router();
const ctrl = require('./index.ctrl.js');

router.post('/connect', ctrl.connect);

module.exports = router;
