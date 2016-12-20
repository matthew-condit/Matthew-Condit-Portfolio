var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Home'
  });
});

/* GET about page. */
router.get('/about', function (req, res, next) {
  res.render('about', {
    title: 'About Me'
  });
});

/* GET resume page. */
router.get('/resume', function (req, res, next) {
  res.render('resume', {
    title: 'Resume'
  });
});

/* GET countdown page. */
router.get('/countdown', function (req, res, next) {
  res.render('countdown', {
    title: 'Christmas Countdown'
  });
});

/* GET portfolio page. */
router.get('/works', function (req, res, next) {
  res.render('works', {
    title: 'My Portfolio'
  });
});

router.get('/nature', function (req, res, next) {
  res.render('nature', {
    title: 'Nature'
  });
});

router.get('/draw', function (req, res, next) {
  res.render('webGL', {
    title: 'Draw Away!'
  });
})


module.exports = router;