'use strict';

var app = angular.module('blogApp', []);

var singleBlogApp = angular.module('singleBlogApp', ['ngRoute']);

app.controller('mainCtrl',function($scope, $http, $sce, $filter) {
  console.log('normal app controller');
  $scope.refresh = function(callback) {
    $http.get('api/blogs').then(function(response) {
      for (var i in response.data.blogs) {
        response.data.blogs[i].preview = $sce.trustAsHtml($filter('limitTo')(response.data.blogs[i].body, 300) + '...');
      }; 
      $scope.blogs = response.data.blogs;
      callback();
  })};
  $scope.refresh(function() {
    var waitlist = $('.waiting');
    console.log(waitlist.length);
    waitlist.each(function(i, el) {
      console.log('Not sure why this isnt firing');
      var $el = waitlist.eq(i);
      if ($el.visible(true)) {
        $el.addClass("already-visible").removeClass('waiting'); 
      } 
    }) 
  }); 
  
  $scope.delete = function ( blog ) {
    $http.delete('../api/blog/' + blog._id).then(function(response) {
      $scope.refresh(function() {});
    });
  };

  $scope.like = function ( blog ) {
    $http.post('../api/like/' + blog._id).then(function(response){
      blog.liked = true;
      $scope.refresh(function() {});
    });
  };
  
  
  
  var win = $(window); 
  win.scroll(function(event) {
    var waitlist = $('.waiting');
    console.log(waitlist.length);
    waitlist.each(function(i, el) {
      var $el = waitlist.eq(i);
      if ($el.visible(true)) {
        $el.addClass("come-in").removeClass('waiting'); 
      } 
    }); 
  });
});



singleBlogApp.controller('blogCtrl',function($scope, $http, $location, $sce) {
  console.log('Single app controller');
  var path = $location.absUrl().split(/[\s/]+/).pop();
  console.log(path);
  console.dir($location);
  $http.get('../api/blog/' + path).then(function(response) {
    console.dir(response.data);
    $scope.blog = response.data.blog;
    $scope.blogHTML = $sce.trustAsHtml('<p>' +response.data.blog.body +'</p>');
    $scope.author = response.data.author[0];
  });



});

(function($) {

  $.fn.visible = function(partial) {  
    var $t            = $(this),
        $w            = $(window),
        viewTop       = $w.scrollTop(),
        viewBottom    = viewTop + $w.height(),
        _top          = $t.offset().top,
        _bottom       = _top + $t.height(),
        compareTop    = partial === true ? _bottom : _top,
        compareBottom = partial === true ? _top : _bottom;
    if ($t.offset().top < $w.height()) return false;
    return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
  };
    
})(jQuery);
