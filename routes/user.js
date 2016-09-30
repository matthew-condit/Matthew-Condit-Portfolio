'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('blogs', {title: 'Blog Posting Time!'});
});
router.get('/:id', function(req, res, next) {
  res.render('blogs', {title: 'Blog Posting Time!'});
});

module.exports = router;
