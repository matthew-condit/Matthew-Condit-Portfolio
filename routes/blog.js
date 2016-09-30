var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('all blogs router');
  res.render('blogs', {title: 'Blog Posting Time!'});
});
router.get('/:id', function(req, res, next) {
  console.log('blog router');
  res.render('blog', {title: 'Blog Posting Time!'});
});

router.get('/users', function(req, res, next) {
  res.render('blogs', {title: 'Blog Posting Time!'});
});
router.get('/user/:id', function(req, res, next) {
  res.render('blogs', {title: 'Blog Posting Time!'});
});

router.get('*', function(req, res, next) {
  res.render('blogs', {title: 'Blog Posting Time!'});
});



module.exports = router;
