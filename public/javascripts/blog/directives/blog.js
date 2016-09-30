'use strict';

function BlogDirective () {
  return {
    templateUrl: 'templates/blog.html',
    replace: true,
    controller: 'mainCtrl'
  }
}

module.exports = BlogDirective;
