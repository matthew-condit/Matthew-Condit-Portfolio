'use strict';

var app = angular.module('blogApp', []);

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
  $http.get('api/blogs').then(function(response) {
    $scope.blogs = response.data.blogs;
  });
});

app.controller('blogCtrl',function($scope, $http, $route) {
  $http.get('api/blog/' + $route.params.id).then(function(response) {
    $scope.blog = response.data.blog;
  });
});
