// class palette
function Palette(title, userName, createdDate, views, likes, colors, colorWidths) {
  this.title = title;
  this.userName = userName;
  this.createdDate = createdDate;
  this.views = views;
  this.likes = likes;
  this.colors = colors;
  this.colorWidths = colorWidths;
}
//function to convert the width array values to precentage- using later on in the style attribute of each color in the palette
Palette.prototype.convertWidth = function(){
  for(var i=0; i<this.colorWidths.length; i++){
        this.colorWidths[i]*=100;
      }  
};

var app = angular.module('colorloverApp', ['ngRoute']);

//config of the routes
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

//function to generate an array of palettes using the Palette class with the responce from the API
var generateArrayOfPallets = function (response){
  var paletteArray = [],
      paletteObj= {};

  for(var i=0; i<response.data.length; i++){
      paletteObj = new Palette(response.data[i].title, response.data[i].userName, response.data[i].dateCreated, response.data[i].numViews, response.data[i].numHearts, response.data[i].colors, response.data[i].colorWidths);
      paletteObj.convertWidth();
      paletteArray.push(paletteObj);
    }
    return paletteArray;
};

//directive for palette info include title, user, creation date  
app.directive("paletteInfo", function() {
    return {
        template : "<h4 class='text-center'>{{palette.title}}</h4><p><i>Created by:</i> @{{palette.userName}}</p><p><i>Created at:</i> {{((palette.createdDate).split(' '))[0]}}</p>",
        restrict: "E"
    };
});

//directive for number of views and hearts
app.directive("viewsAndLikes", function() {
    return {
        template : "<p><i class='fa fa-eye'></i>&nbsp&nbsp{{palette.views}}&nbsp&nbsp&nbsp<i class='fa fa-heart'></i>&nbsp&nbsp{{palette.likes}}&nbsp&nbsp&nbsp</p>",
        restrict: "E"
    };
});

//main controler not in use at the moment since there is only one page
app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

}]);

app.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {
  $http.get('/api/new').then(function (response){
    $scope.dataNew = generateArrayOfPallets(response);
  });

 $http.get('/api/top').then(function (response){
    $scope.dataTop = generateArrayOfPallets(response);
  });
}]);
