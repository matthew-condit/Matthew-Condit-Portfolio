var express = require('express');
var request = require('request');
var router = express.Router();

/* Sends new email. */
router.post('/', function(req, res) {
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

module.exports = router;
