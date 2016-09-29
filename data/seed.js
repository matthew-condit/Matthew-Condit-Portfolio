'use strict';

var Blog = require('../data/models/blog');
var User = require('../data/models/user');


// Blog.remove({}, function() {});
// User.remove({}, function() {});

//
var users = [
  {
    name: "Matt Condit",
    username:"mcondit",
    password: "hockey333"
  },
  {
    name: "Ben Condit",
    username: "bcondit",
    password: "bigpapi34"
  },
  {
    name: "Dan Condit",
    username: "dcondit",
    password: "bobbyorrsgonnascore"
  }
];

var blogs = [
  {
    title: "Cool Things 1",
    body: "DIY vice pok pok, lo-fi selvage direct trade literally. Viral cornhole food truck vegan brooklyn tousled microdosing sustainable, deep v retro messenger bag la croix. Unicorn echo park selfies cliche. Yuccie deep v tumeric gluten-free literally, health goth crucifix ramps. Raclette lomo pabst, deep v godard +1 biodiesel photo booth keffiyeh mumblecore thundercats jianbing flexitarian. Waistcoat ennui fixie selfies, keytar tilde shabby chic jianbing forage vape retro gastropub pabst listicle occupy. Fashion axe irony neutra, pickled iceland truffaut yuccie mumblecore DIY occupy enamel pin tousled narwhal mustache live-edge.",
    hidden: false,
    username: "dcondit"
  },
  {
    title: "Cool Things 2",
    body: "DIY vice pok pok, lo-fi selvage direct trade literally. Viral cornhole food truck vegan brooklyn tousled microdosing sustainable, deep v retro messenger bag la croix. Unicorn echo park selfies cliche. Yuccie deep v tumeric gluten-free literally, health goth crucifix ramps. Raclette lomo pabst, deep v godard +1 biodiesel photo booth keffiyeh mumblecore thundercats jianbing flexitarian. Waistcoat ennui fixie selfies, keytar tilde shabby chic jianbing forage vape retro gastropub pabst listicle occupy. Fashion axe irony neutra, pickled iceland truffaut yuccie mumblecore DIY occupy enamel pin tousled narwhal mustache live-edge.",
    hidden: false,
    username: "dcondit"
  },
  {
    title: "Cool Things 3",
    body: "DIY vice pok pok, lo-fi selvage direct trade literally. Viral cornhole food truck vegan brooklyn tousled microdosing sustainable, deep v retro messenger bag la croix. Unicorn echo park selfies cliche. Yuccie deep v tumeric gluten-free literally, health goth crucifix ramps. Raclette lomo pabst, deep v godard +1 biodiesel photo booth keffiyeh mumblecore thundercats jianbing flexitarian. Waistcoat ennui fixie selfies, keytar tilde shabby chic jianbing forage vape retro gastropub pabst listicle occupy. Fashion axe irony neutra, pickled iceland truffaut yuccie mumblecore DIY occupy enamel pin tousled narwhal mustache live-edge.",
    hidden: false,
    username: "bcondit"
  },
  {
    title: "Cool Things 4",
    body: "DIY vice pok pok, lo-fi selvage direct trade literally. Viral cornhole food truck vegan brooklyn tousled microdosing sustainable, deep v retro messenger bag la croix. Unicorn echo park selfies cliche. Yuccie deep v tumeric gluten-free literally, health goth crucifix ramps. Raclette lomo pabst, deep v godard +1 biodiesel photo booth keffiyeh mumblecore thundercats jianbing flexitarian. Waistcoat ennui fixie selfies, keytar tilde shabby chic jianbing forage vape retro gastropub pabst listicle occupy. Fashion axe irony neutra, pickled iceland truffaut yuccie mumblecore DIY occupy enamel pin tousled narwhal mustache live-edge.",
    hidden: false,
    username: "mcondit"
  },
  {
    title: "Cool Things 5",
    body: "DIY vice pok pok, lo-fi selvage direct trade literally. Viral cornhole food truck vegan brooklyn tousled microdosing sustainable, deep v retro messenger bag la croix. Unicorn echo park selfies cliche. Yuccie deep v tumeric gluten-free literally, health goth crucifix ramps. Raclette lomo pabst, deep v godard +1 biodiesel photo booth keffiyeh mumblecore thundercats jianbing flexitarian. Waistcoat ennui fixie selfies, keytar tilde shabby chic jianbing forage vape retro gastropub pabst listicle occupy. Fashion axe irony neutra, pickled iceland truffaut yuccie mumblecore DIY occupy enamel pin tousled narwhal mustache live-edge.",
    hidden: false,
    username: "mcondit"
  }
]


users.forEach(function(user, index){
  User.find({'username': user.username}, function(err, users){
    if (!err && !users.length) {
      console.log("creating " + user.name);
      User.create({name: user.name, username: user.username, password: user.password});
    }
    if (err) {
      console.error(err);
    }
  });
});


var blogUserId;
blogs.forEach(function(blog, index) {
  Blog.find({'title': blog.title}, function(err, blogs) {
    if (!err && !blogs.length) {
      User.findOne({'username': blog.username}, function(err, user) {
        blogUserId = user._id;
        Blog.create({title: blog.title, author: blogUserId, body: blog.body, hidden: blog.hidden});
      });
    }
    if (err) {
      console.log(err);
    }
  });
});
