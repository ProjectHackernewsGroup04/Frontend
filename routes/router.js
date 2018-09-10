let express = require('express');
let router = express.Router();
let request = require('request');

router.get('/', function(req, res) {
  res.send('This is the hackernews frontend.');
});

module.exports = router;
