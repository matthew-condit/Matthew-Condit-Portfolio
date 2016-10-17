'use strict';

var express = require('express');
var passport = require('passport');
var Blog = require('../data/models/blog');
var User = require('../data/models/user');

var router = express.Router();

router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    return res.json({ users: users });
  });
});

router.get('/user/:id', function(req, res) {
  var id = req.params.id;
  User.findOne({_id: id}, function(err, user) {
    if (err) {
      return res.status(500).json({message: err.message});
    }
    Blog.find({author: user._id}, function(err, blogs){
      console.log(err);
      return res.json({user: user, blogs: blogs});
    });

  });
});


router.get('profile/:id', function(req, res) {

});

router.get('/blogs', function(req, res) {
  Blog.find({}).sort({date: -1})
  .populate('author')
  .exec( function(err, blogs) {
    if (err) {
      return res.status(500).json({message: err.message});
    }
    return res.json({blogs: blogs});
  });
});

router.get('/blog/:id', function(req, res) {
  var id = req.params.id;
  Blog.findOne({_id: id}, function(err, blog) {
    if (err) {
      return res.status(500).json({message: err.message});
    }
    User.find({_id: blog.author}, function(err, author){
      console.log(author);
      return res.json({blog: blog, author: author});
    });
  });
});

router.post('/blog', function(req, res) {
  console.log('*******************************', req.body.userId);
  Blog.create({title: req.body.title, author: req.body.userId, body: req.body.body, hidden:false});
  return res.status(200).end();
});

router.post('/like/:id', function(req, res) {
  User.findOne({_id: req.session.userId}, function(err, user) {
    Blog.findOne({_id: req.params.id}, function(err, blog) {
        console.log(err);
        console.log(blog.likes);
        if (blog.likes.indexOf(user._id) == -1) blog.likes.push(user._id);
        console.log(blog.likes);
        blog.save(function (err) {
          if (err) {
            console.error('Angry error: ' + err);
          }
        });
    });
  });
  res.status(200).end();
});

router.delete('/blog/:id', function(req, res) {
  Blog.remove({_id: req.params.id},function(err) {
    if (!err) {
      console.log('Blog Post successfully deleted');
    }else {
      console.error('Error Deleting blog post');
    }
  });
  res.status(200).end();
});

module.exports = router;
