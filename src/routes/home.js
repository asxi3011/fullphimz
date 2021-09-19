const express = require('express');
const router = express.Router();
const home = require('../app/controller/homeController');
router.get('/test',home.test);
router.get('/',home.index);

module.exports = router; 