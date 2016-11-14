var todoApp = angular.module('todoApp');

todoApp.controller('TodoController', ['$scope', '$http', '$location', '$route', '$routeParams', function ($scope, $http, $location, $route, $routeParams) {
  $scope.getTodos = function () {
    $http.get('/api')
    .success(function (res) {
      $scope.todos = res;
    })
    .error(function (err) {
      console.log(err);
    });
  }
  $scope.getTodo = function () {
    var id = $routeParams.id;
    $http.get('/api/'+id)
    .success(function (res) {
      $scope.todo = res;
    })
    .error(function (err) {
      console.log(err);
    })
  }
  $scope.addTodo = function () {
    $http.post('/api', $scope.todo)
    .success(function (res) {
      window.location.href = '';
    })
    .error(function (err) {
      console.log(err);
    })
  }
  $scope.updateTodo = function () {
    var id = $routeParams.id;
    $http.put('/api/' + id, $scope.todo)
    .success(function (res) {
      window.location.href = '/#/todo/' + id;
    })
    .error(function (err) {
      console.log(err);
    })
  }
  $scope.removeTodo = function (id) {
    $http.delete('/api/' + id)
    .success(function (res) {
      window.location.href = '';
    })
    .error(function (err) {
      console.log(err);
    })
  }
  $scope.toggleTodo = function (id) {
    $http.put('/api/' + id + '/toggle')
    .success(function (res) {
      $route.reload();
    })
    .error(function (err) {
      console.log(err);
    })
  }
}]);
