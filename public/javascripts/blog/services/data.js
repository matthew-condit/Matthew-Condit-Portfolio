'use strict';

function DataService($http, $q) {

  this.getBlogs = function (cb) {
    $http.get('api/blogs').then(cb);
  };

  this.getBlog = function (id, cb) {
    $http.get('api/blog/' + id).then(cb);
  };

  this.getUsers = function (cb) {
    $http.get('api/users').then(cb);
  };

  this.getUser = function (id, cb) {
    $http.get('api/user/' + id).then(cb);
  };


  module.exports = DataService;
}