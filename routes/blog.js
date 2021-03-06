var express = require('express');
var request = require('request');
var mid = require('../middleware');
var User = require('../data/models/user');
var multer = require('multer');
var mime = require('mime');
//var upload = multer({dest: '/tmp/'});

var router = express.Router();

var storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, './public/images/uploads');
  }, 
  filename: function(req, file, callback) {
    console.log(file);
    callback(null, file.fieldname + '-'+ Date.now() +'.'+ mime.extension(file.mimetype));
  }
});
var upload = multer({storage: storage});


/* GET all blogs page. */
router.get('/', function(req, res, next) {;
  if (req.session.userId) {
    User.findById(req.session.userId)
      .exec(function(error, user) {
        if (error) {
          return next(error);
        }
        else {
          var userObject = user.toObject();
          return res.render('blogs', {title: 'Blogs', name: userObject.name, id: userObject._id, admin: userObject.admin, loggedIn: true});
        }
      })
  } 
  else
  {
    return res.render('blogs', {title: 'My Blog'});
  }
});

/* GET New blog page. */
router.get('/newblog', mid.requiresLogin, function(req, res, next) {
  console.log('New Blog Router');
  if (req.session.userId) {
    return res.render('newblog', {title: 'New Blog Post', userId: req.session.userId})
  } else {
    var err = new Error('You must sign in to post an article');
    err.status = 401;
    return next(err);
  }
});

/* GET post blog page. */
router.get('/postblog', mid.requiresLogin, function(req, res, next) {
  console.log('New Blog Router');
  return res.render('postblog', {title: 'New Blog Post', userId: req.session.userId})
});

/* POST post blog page. */
router.post('/postblog', upload.single('blogImage'), function(req, res, next) {
  var title = req.body.title;
  var body = req.body.bodyInput;
  var imageUrl = req.file.filename;
  request.post('http://' + req.headers.host + '/api/blog', {json: {body: body, title: title, userId: req.session.userId, imageUrl: imageUrl}},
    function(err, httpResponse, body) {
      if (err) { 
        console.error('error posting blog'); 
      } else { 
        console.log('Blog Post successfully uploaded');
      }
    });
  return res.redirect('/blog');
});

//
///* POST saveblog router. */
//router.post('/saveBlog', upload.single('image'),function(req, res, next) {
//  console.log(req.body, 'Body'); 
//  console.log(req.file, 'files');
//  var title = req.body.titleInput;
//  var body = req.body.bodyInput;
//  request.post('http://' +req.headers.host + '/api/blog', {json: {body: body, title: title, userId: req.session.userId}},
//  function(err, httpResponse, body) {
//    if (err) {
//      console.error('error posting blog');
//    }
//    console.log('Blog Post successfully uploaded');
//  });
//  return res.redirect('/blog');
//});
/* GET register page. */
router.get('/register', function(req, res, next) {
  return res.render('register', {title: 'Register'});
});
/* POST register page. */
router.post('/register', function(req, res, next) {
  console.log(req.body);
  if (req.body.name && req.body.email && req.body.username && req.body.password && req.body.confirmPassword)
  {
    //if passwords don't match
    if(req.body.password !== req.body.confirmPassword){
      var err = new Error('All fields required');
      err.status = 400;
      return next(err);
    }
    //create object
    var userData = {
      name: req.body.name,
      email: req.body.email,
      username : req.body.username,
      password : req.body.password
    };
    User.create(userData, function(error, user) {
        if (error) {
        return next(error);
      } else {
        req.session.userId = user._id;
        return res.redirect('/blog');
      }
    });

  } else {
    var err = new Error('All fields required');
    err.status = 400;
    return next(err);
  }
});

/* GET login page. */
router.get('/login', function(req, res, next) {
  return res.render('login', {title: 'Log In'});
});

/* POST login page. */
router.post('/login', function(req, res, next) {
  console.log(req.body.email, req.body.password);
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function(error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        console.log('wrong email error');
        return next(err);
      }
      else {
        req.session.userId = user._id;
        return res.redirect('/blog');
      }
    })
  } else {
    console.log('WEIRD ERROR BRO');
    var err = new Error('Email and password are missing.');
    err.status = 401;
    return next(err);
  }
});


//GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    //delete it
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        res.redirect('/blog');
      }
    })
  }
});


router.get('/:id', function(req, res, next) {
  return res.render('blog', {title: 'Blog'});
});

module.exports = router;
