'use strict';

function DataService ($http, $q) {

  this.getBlogs = function(cb) {
    $http.get('api/blogs').then(cb);
  }

  this.getBlog = function(id, cb) {
    $http.get('api/blog/' + id).then(cb);
  }

  this.getUsers = function(cb) {
    $http.get('api/users').then(cb);
  }

  this.getUser = function(id, cb) {
    $http.get('api/user/'+ id).then(cb);
  }


//   this.getTodos = function(cb) {
//     $http.get('/api/todos').then(cb);
//   };
//
//   this.deleteTodo = function(todo) {
//     console.log("I deleted the " + todo.name + " todo!");
//   };
//
//   this.saveTodos = function(todos) {
//     var queue = [];
//     todos.forEach(function(todo) {
//         var request;
//         if(!todo._id) {
//           request = $http.post('/api/todos', todo);
//         } else {
//           request = $http.put('/api/todos/' + todo._id, todo).then(function(result) {
//             todo = result.data.todo;
//             return todo;
//           });
//         }
//         queue.push(request);
//     });
//     return $q.all(queue).then(function(results) {
//       console.log("I saved " + todos.length + " todos!");
//     });
//   };
//
// }

module.exports = DataService;
