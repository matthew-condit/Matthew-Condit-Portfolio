'use strict';

var express = require('express');
var passport = require('passport');
var Blog = require('../data/models/blog');
var User = require('../data/models/user');
var ctrlProfile = require('./controllers/profile');
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var router = express.Router();

router.get('/profile', auth, ctrlProfile.profileRead);

router.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ users: users });
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
      res.json({user: user, blogs: blogs});
    });

  });
});


//New Functions to implement
router.post('/register', function(req, res) {
  console.log("Registering user: " + req.body.username);

  var user = new User();
  user.name = req.body.name;
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  user.save(function(err) {
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({"token": token});
  });
});

router.post('/login', function(req, res) {
  passport.authenticate('local', function(err, user, info) {
    var token;

    //If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }
    //If User is found
    if (user) {
    token = user.generateJwt();
    res.status(200);
    res.json({"token": token});
    } else {
      res.status(401).json(info);
    }
  })(req, res);
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
    res.json({blogs: blogs});
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
      res.json({blog: blog, author: author});
    });
  });
});

router.post('/blog', function(req, res) {
  User.findOne({'username': 'mcondit'}, function(err, user) {
    var blogUserId = user._id;
    Blog.create({title: req.body.title, author: blogUserId, body: req.body.body, hidden:false});
  });
  res.status(200).end();
});

router.post('/like/:id', function(req, res) {
  console.log('In like router');
  User.findOne({'username': 'mcondit'}, function(err, user) {
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

//
// router.post('/todos', function(req, res) {
//   var todo = req.body;
//   Todo.create(todo, function(err, todo) {
//     if (err) {
//       return res.status(500).json({ err: err.message });
//     }
//     res.json({ 'todo': todo, message: 'Todo Created' });
//   });
// });
//
// router.put('/todos/:id', function(req, res) {
//   var id = req.params.id;
//   var todo = req.body;
//   if (todo && todo._id !== id) {
//     return res.status(500).json({ err: "Ids don't match!" });
//   }
//   Todo.findByIdAndUpdate(id, todo, {new: true}, function(err, todo) {
//     if (err) {
//       return res.status(500).json({ err: err.message });
//     }
//     res.json({ 'todo': todo, message: 'Todo Updated' });
//   });
// });
//
// // TODO: Add DELETE route to remove existing entries
//
