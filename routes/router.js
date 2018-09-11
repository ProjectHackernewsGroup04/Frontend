let express = require('express');
let router = express.Router();
let request = require('request');

router.get('/', function(req, res) {
  res.render('home');
});

router.get('/dummy', function(req, res) {
  res.render('dummy');
});

module.exports = router;
