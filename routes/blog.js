var express = require('express');
var router = express.Router();
var request = require('request');
var api = require('../api');
/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('blog/blog', {title: 'Blog Posting Time!'});
});


module.exports = router;
