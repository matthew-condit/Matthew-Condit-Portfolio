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
})
.service('authentication', authentication);

authentication.$inject = ['$http', '$window'];
function authentication ($http, $window) {

  var saveToken = function( token ) {
    $window.localStorage['condit-blog-token'] = token;
  };

  var getToken = function() {
    return $window.localStorage['condit-blog-token'];
  };

  var isLoggedIn = function() {
      var token = getToken();
      var payload;

      if(token){
        payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
  };

  var currentUser = function() {
    if(isLoggedIn()){
      var token = getToken();
      var payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);
      return {
        email : payload.email,
        name : payload.name
      };
    }
  };

  register = function(user) {
    return $http.post('../api/register', user).success(function(data){
      saveToken(data.token);
    });
  };

  login = function(user) {
    return $http.post('../api/login', user).success(function(data) {
      saveToken(data.token);
    });
  };

  logout = function() {
    $window.localStorage.removeItem('condit-blog-token');
  };

  return {
    currentUser : currentUser,
    saveToken : saveToken,
    getToken : getToken,
    isLoggedIn : isLoggedIn,
    register : register,
    login : login,
    logout : logout
  };
};

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
