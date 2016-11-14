var todoApp = angular.module('todoApp', ['ngRoute']);

todoApp.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    controller: 'TodoController',
    templateUrl: 'views/todos.html'
  })
  .when('/todo/:id', {
    controller: 'TodoController',
    templateUrl: 'views/todo.html'
  })
  .when('/add', {
    controller: 'TodoController',
    templateUrl: 'views/add_todo.html'
  })
  .when('/edit/:id', {
    controller: 'TodoController',
    templateUrl: 'views/edit_todo.html'
  })
  .otherwise({
    redirectTo: '/'
  })
})
