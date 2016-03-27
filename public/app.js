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

//directive for scroll down effect
app.directive('scrollOnClick', function() {
  return {
    restrict: 'A',
    link: function($scope, $elm, attrs) {
      var idToScroll = attrs.href;
      $elm.on('click', function() {
        var $target;
        if (idToScroll) {
          $target = $(idToScroll);
        } else {
          $target = $elm;
        }
        $("body").animate({scrollTop: $target.offset().top}, "slow");
      });
    }
  };
});

//main controller not in use at the moment since there is only one page
app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {

}]);

//home controller - control on all the page
app.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {

  // Array of hues for the filter function
  $scope.hues = [{name: 'all', selected:false}, {name: 'red', selected:false}, {name: 'orange', selected:false} , {name: 'yellow', selected:false}, {name: 'green', selected:false}, {name: 'aqua', selected:false}, {name: 'blue', selected:false}, {name: 'violet', selected:false}, {name: 'fuchsia', selected:false}];

  // function to load result from the api the function build the url depands on the filter
  $scope.loadResults = function(){
    urlNew = '/api/new';
    urlTop = '/api/top';

    if($scope.filterHues){
      if($scope.filterHues[0] !=='all'){
        $scope.urlFilter = $scope.filterHues.toString();
        urlNew = urlNew + '?hueOption=' + $scope.urlFilter;
        urlTop = urlTop + '?hueOption=' + $scope.urlFilter;
      } else{
          $scope.urlFilter = '';
          for(var i=1; i<$scope.hues.length; i++){
            $scope.urlFilter = $scope.urlFilter + $scope.hues[i].name + ',';
          }
          var urlStr = urlNew + '?hueOption=' + $scope.urlFilter;
          //trim the last ","
          urlNew = urlStr.substring(0, urlStr.length - 1);
          urlTop = urlStr.substring(0, urlStr.length - 1);
        }
    }

    $http.get(urlNew).then(function (response){
      $scope.dataNew = generateArrayOfPallets(response);
    });

   $http.get(urlTop).then(function (response){
      $scope.dataTop = generateArrayOfPallets(response);
    });    
  };

  //function build an array with  hues to filter
 $scope.filter = function(){
  $scope.filterHues = [];
  for(var i=0; i<$scope.hues.length; i++){
    if($scope.hues[i].selected){
      $scope.filterHues.push($scope.hues[i].name);
    }
  } 
  $scope.loadResults();
 };

 //excute the loadResult function to initiate the content
 $scope.loadResults();
}]);
