var express = require('express');
var request = require('request');
var router = express.Router();

/* GET all blogs page. */
router.get('/', function(req, res, next) {
  console.log(req.params.id);
  if (req.params.id){
    res.render('blog', {title: 'My Blog'});
  }else
  res.render('blogs', {title: 'My Blog'});
});

/* GET New blog page. */
router.get('/newblog', function(req, res, next) {
  console.log('New Blog Router');
  res.render('newblog', {title: 'New Blog'});
});

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', {title: 'Register'});
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', {title: 'Log In'});
});

/* POST saveblog router. */
router.post('/saveBlog', function(req, res, next) {
  var title = req.body.titleInput;
  var body = req.body.bodyInput;
  request.post('http://' +req.headers.host + '/api/blog', {json: {body: body, title: title}},
  function(err, httpResponse, body) {
    if (err) {
      return console.error('error posting blog');
    }
    console.log('Blog Post successfully uploaded');
  });
  res.redirect('/blog');
});

router.get('/:id', function(req, res, next) {
  res.render('blog', {title: 'Blog'});
});

module.exports = router;
