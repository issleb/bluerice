var express = require('express');
var router = express.Router();

const stripMax = 281;
const newStripMax = 16;
const stripBase = 'https://s3-us-west-2.amazonaws.com/bluerice/strips/';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET /random listing. */
router.get('/random', function(req, res, next) {
  var stripNum = getRandomInt(1, stripMax);
  var stripUrl = stripBase + stripNum + '.gif';

  res.json(stripUrl);
});

/* GET /random/new listing. */
router.get('/random/new', function(req, res, next) {
  var stripNum = getRandomInt(1, newStripMax);
  var stripUrl = stripBase + 'N' + stripNum + '.gif';

  res.json(stripUrl);
});

module.exports = router;
