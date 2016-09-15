var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Matthew Condit:  .NET and JS Web Developer in Boston, MA' });
});

module.exports = router;
