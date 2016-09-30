var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.params.id);
  if (req.params.id){
    res.render('blog', {title: 'Blog Posting Time!'});
  }else
  res.render('blogs', {title: 'Blog Posting Time!'});
});
router.get('/:id', function(req, res, next) {
  console.log('blog router');
  res.render('blog', {title: 'Blog Posting Time!'});
});



module.exports = router;
