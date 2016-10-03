var express = require('express');
var router = express.Router();

const stripMax = 75;
const stripBase = 'https://s3-us-west-2.amazonaws.com/bluerice/';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET /todos listing. */
router.get('/random', function(req, res, next) {
  var stripNum = getRandomInt(1, 75);
  var stripUrl = stripBase + 'BR' + stripNum + '.gif';

  res.json(stripUrl);
});

module.exports = router;
