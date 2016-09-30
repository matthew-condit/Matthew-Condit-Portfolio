'use strict';

function MainCtrl ($scope, dataService) {
  dataService.getTodos(function(response){
    var blogs = response.data.blogs;
    $scope.blogs =  blogs;
  });
}
module.exports = MainCtrl;
