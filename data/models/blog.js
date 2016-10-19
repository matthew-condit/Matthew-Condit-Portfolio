'use strict';

var mongoose = require('mongoose');

var blogSchema = new mongoose.Schema({
	title: String,
	author: {type: mongoose.Schema.ObjectId, ref: 'User'},
  body: String,
  imageUrl: String,
  comments: [{body: String, date: Date}],
  date: {type:Date, default: Date.now},
  hidden: Boolean,
  likes : [{ type: mongoose.Schema.ObjectId, ref: 'User'} ]
});

var authorSchema = new mongoose.Schema({});

var model = mongoose.model('Blog', blogSchema);

module.exports = model;
