'use strict';

var app = angular.module('blogApp', []);

var singleBlogApp = angular.module('singleBlogApp', ['ngRoute']);

app.controller('mainCtrl', function ($scope, $http, $sce, $filter) {
  console.log('normal app controller');
  $scope.refresh = function (callback) {
    $http.get('api/blogs').then(function (response) {
      for (var i in response.data.blogs) {
        response.data.blogs[i].preview = $sce.trustAsHtml($filter('limitTo')(response.data.blogs[i].body, 300) + '...');
      };
      $scope.blogs = response.data.blogs;
      callback();
    })
  };
  $scope.refresh(function () {
    $http.get('api/blogs').then(function (response) {
      $scope.blogs = response.data.blogs;
    })
  });

  $scope.delete = function (blog) {
    $http.delete('../api/blog/' + blog._id).then(function (response) {
      $scope.refresh(function () {});
    });
  };

  $scope.like = function (blog) {
    $http.post('../api/like/' + blog._id).then(function (response) {
      blog.liked = true;
      $scope.refresh(function () {});
    });
  };
});



singleBlogApp.controller('blogCtrl', function ($scope, $http, $location, $sce) {
  console.log('Single app controller');
  var path = $location.absUrl().split(/[\s/]+/).pop();
  console.log(path);
  console.dir($location);
  $http.get('../api/blog/' + path).then(function (response) {
    console.dir(response.data);
    $scope.blog = response.data.blog;
    $scope.blogHTML = $sce.trustAsHtml('<p>' + response.data.blog.body + '</p>');
    $scope.author = response.data.author[0];
  });



});