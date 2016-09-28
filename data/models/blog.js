'use strict';

var mongoose = require('mongoose');

// todo.name
// todo.completed

var blogSchema = new mongoose.Schema({
	title: String,
	author: user
});

var authorSchema = new mongoose.Schema({});

var model = mongoose.model('Todo', todoSchema);

module.exports = model;
