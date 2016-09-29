'use strict';

var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
	title: String,
	author: {type: mongoose.Schema.ObjectId, ref: 'User'},
  body: String,
  comments: [{body: String, date: Date}],
  date: {type:Date, default: Date.now},
  hidden: Boolean,
  likes : {num: Number, users: mongoose.Schema.ObjectId}
});

var authorSchema = new mongoose.Schema({});

var model = mongoose.model('Blog', blogSchema);

module.exports = model;
