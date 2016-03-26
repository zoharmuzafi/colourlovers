var app = angular.module('colorloverApp', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider',
  function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
  }
]);

app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

}]);
app.controller('HomeCtrl', ['$scope', '$http', '$timeout',  function ($scope, $http, $timeout) {
  $scope.homeTest = "Welcome to the homepage!";
  $http.get('/api/new').then(function (response){
    console.log(response);
    $scope.dataNew = response;
  });
 $http.get('/api/top').then(function (response){
    console.log(response);
    $scope.dataTop = response;
  });
}]);

