var express = require('express');
var router = express.Router();
var db = require('../queries');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/indicador/all', db.getAllIndicadores);
router.get('/indicador/:id', db.getSingleIndicador);
router.post('/indicador/save', db.createIndicador);
router.put('/indicador/:id', db.updateIndicador);
router.delete('/indicador/:id', db.removeIndicador);

module.exports = router;
