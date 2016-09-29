var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var blogPosts = [    {title: "cool",
    body: "woopeeeee"},
    {title: "cool",
    body: "woopeeeee"}
  ];
  res.render('blog', {title: 'Blog Posting Time!'}, {posts: blogPosts});
});

router.get('', function(req, res, next) {
  var blogPost = {
    title: "cool",
    body: "woopeeeee"
  };
  res.render('post', {title: "Blog Title", post: blogPost})
})

module.exports = router;
