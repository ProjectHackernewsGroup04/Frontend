let express = require('express');
let router = express.Router();
let request = require('request');
let ctrl = require('../backendCtrl/controller');

router.get('/test', async function(req, res) {
  let result = await ctrl.getHomeContent();
  console.log(`I am back ${result.length}`);
  res.render('test', {content: result});
});

router.get('/', async function(req, res) {
  res.render('home');
});

router.get('/dummy', function(req, res) {
  res.render('dummy');
});

router.get('/login', function(req, res) {
  res.send('This feature is not yet implemented..');
});

router.get('/newest', function(req, res) {
  res.send('This feature is not yet implemented..');
});

router.get('/newcomments', function(req, res) {
  res.send('This feature is not yet implemented..');
});

router.get('/show', function(req, res) {
  res.send('This feature is not yet implemented..');
});

router.get('/ask', function(req, res) {
  res.send('This feature is not yet implemented..');
});

router.get('/jobs', function(req, res) {
  res.send('This feature is not yet implemented..');
});

router.get('/submit', function(req, res) {
  res.send('This feature is not yet implemented..');
});

module.exports = router;
