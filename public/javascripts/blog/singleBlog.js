'use strict';
var singleBlogApp = angular.module('singleBlogApp', ['ngRoute', 'ngResource']);

singleBlogApp.controller('blogCtrl',function($scope, $http) {
  // $http.get('api/blog/' + $route.params.id).then(function(response) {
  //   $scope.blog = response.data.blog;
  // });
});
