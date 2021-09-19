const express = require('express');
const router = express.Router();
const me = require('../app/controller/meController');

router.get('/addmovie',me.addmovie);
router.get('/listmovie',me.listmovie);
router.get('/changemovie/:id',me.changemovie);
router.get('/movie/:name/:tap',me.watchmoviepb);
router.get('/movie/:name',me.watchmovie);
router.get('/search',me.search);
router.get('/:slug',me.infoMovie);
router.get('/',me.index);

//post
router.post('/upload',me.upload);
router.post('/deleteMovie/:id',me.deletemovie);

module.exports = router; 