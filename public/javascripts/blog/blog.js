'use strict';

var app = angular.module('blogApp', []);

var singleBlogApp = angular.module('singleBlogApp', ['ngRoute']);
// function DataService ($http, $q) {
//
//     this.getBlogs = function(cb) {
//       $http.get('api/blogs').then(cb);
//     }
//
//     this.getBlog = function(id, cb) {
//       $http.get('api/blog/' + id).then(cb);
//     }
//
//     this.getUsers = function(cb) {
//       $http.get('api/users').then(cb);
//     }
//
//     this.getUser = function(id, cb) {
//       $http.get('api/user/'+ id).then(cb);
//     }
// }



app.controller('mainCtrl',function($scope, $http) {
  console.log('normal app controller');
  $http.get('api/blogs').then(function(response) {
    $scope.blogs = response.data.blogs;
  });
});

singleBlogApp.controller('blogCtrl',function($scope, $http, $location) {
  console.log('Single app controller');
  var path = $location.absUrl().split(/[\s/]+/).pop();
  console.log(path);
  console.dir($location);
  $http.get('../api/blog/' + path).then(function(response) {
    console.dir(response.data);
    $scope.blog = response.data.blog;
    $scope.author = response.data.author[0];
  });
});
