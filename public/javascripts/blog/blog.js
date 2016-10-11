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
  $scope.refresh = function() {
    $http.get('api/blogs').then(function(response) {
    $scope.blogs = response.data.blogs;
  })};
  $scope.refresh();

  $scope.delete = function ( blog ) {
    $http.delete('../api/blog/' + blog._id).then(function(response) {
      $scope.refresh();
    });
  };

  $scope.like = function ( blog ) {
    $http.post('../api/like/' + blog._id).then(function(response){
      $scope.refresh();
    });
  };
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
