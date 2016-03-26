var app = angular.module('colorloverApp', ['ngResource', 'ngRoute']);
// app.factory('Palette', ['$resource', function($resource) {
//   return $resource("/api/palettes", {
//     query: {
//       isArray: true
//     }
//   });
// }]);
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

app.controller('MainCtrl', ['$scope', function ($scope) {
	// var i = Palette.query();
}]);
app.controller('HomeCtrl', ['$scope', function ($scope) {
  $scope.homeTest = "Welcome to the homepage!";
}]);

