const express = require('express');
const router = express.Router();
const type = require('../app/controller/typeController');
router.get('/:theloai',type.movieType);


module.exports = router; 