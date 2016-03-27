// Class palette
function Palette(title, userName, createdDate, views, likes, colors, colorWidths) {
  this.title = title;
  this.userName = userName;
  this.createdDate = createdDate;
  this.views = views;
  this.likes = likes;
  this.colors = colors;
  this.colorWidths = colorWidths;
}

//Convert the width array values to precentage number
Palette.prototype.convertWidth = function(){
  for(var i=0; i<this.colorWidths.length; i++){
        this.colorWidths[i]*=100;
      }  
};

var app = angular.module('colorloverApp', ['ngRoute']);

//Config of the routes
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

//Directive for palette info includes title, username, creation date  
app.directive("paletteInfo", function() {
    return {
        template : "<h4 class='text-center'>{{palette.title}}</h4><p><i>Created by:</i> @{{palette.userName}}</p><p><i>Created at:</i> {{((palette.createdDate).split(' '))[0]}}</p>",
        restrict: "E"
    };
});

//Directive for number of views and hearts
app.directive("viewsAndLikes", function() {
    return {
        template : "<p><i class='fa fa-eye'></i>&nbsp&nbsp{{palette.views}}&nbsp&nbsp&nbsp<i class='fa fa-heart'></i>&nbsp&nbsp{{palette.likes}}&nbsp&nbsp&nbsp</p>",
        restrict: "E"
    };
});

//Directive for scroll down effect
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

//Generates an array of palettes using the Palette class with the response from the API
var generateArrayOfPallets = function (dataArr){
  var paletteArray = [],
      paletteObj= {};

  for(var i=0; i<dataArr.length; i++){
      paletteObj = new Palette(dataArr[i].title, dataArr[i].userName, dataArr[i].dateCreated, dataArr[i].numViews, dataArr[i].numHearts, dataArr[i].colors, dataArr[i].colorWidths);
      paletteObj.convertWidth();
      paletteArray.push(paletteObj);
    }
    return paletteArray;
};
//Main controller is currently not in use at since there is only one page once I will add more pages this controler will function as mutual controller on top of the individual controller
app.controller('MainCtrl', ['$scope', '$http', function ($scope, $http) {
}]);

//Home controller - control on all the page "/"
app.controller('HomeCtrl', ['$scope', '$http', function ($scope, $http) {

  // Array of hues for the filter function
  $scope.hues = [{name: 'all', selected:false}, {name: 'red', selected:false}, {name: 'orange', selected:false} , {name: 'yellow', selected:false}, {name: 'green', selected:false}, {name: 'aqua', selected:false}, {name: 'blue', selected:false}, {name: 'violet', selected:false}, {name: 'fuchsia', selected:false}];

  // Bulids and invokes the server URL according to selected filters
  var loadResults = function(){

    //Base urls
    var urlNew = '/api/new';
    var urlTop = '/api/top';
    var parameterToFilter ='';

    //Add selected filter to URL if exists
    if($scope.filterHues){
      if($scope.filterHues[0] !=='all'){
        parameterToFilter = $scope.filterHues.toString();
      }else{
          parameterToFilter = '';
          for(var i=1; i<$scope.hues.length; i++){
            parameterToFilter = parameterToFilter + $scope.hues[i].name + ',';
          }
          //Trim the last ","
          parameterToFilter = parameterToFilter.substring(0, parameterToFilter.length - 1);
      }
      urlNew = urlNew + '?hueOption=' + parameterToFilter;
      urlTop = urlTop + '?hueOption=' + parameterToFilter;
    }

    //Server call to bring the new category
    $http.get(urlNew).then(function (response){
      $scope.dataNew = generateArrayOfPallets(response.data);
    });

    //Server call to bring the top category
   $http.get(urlTop).then(function (response){
      $scope.dataTop = generateArrayOfPallets(response.data);
    });    
  };

  //Builds an array with hues to filter
 $scope.filter = function(){
  $scope.filterHues = [];
  for(var i=0; i<$scope.hues.length; i++){
    if($scope.hues[i].selected){
      $scope.filterHues.push($scope.hues[i].name);
    }
  } 
  loadResults();
 };

 //Excute the loadResult function to initiate the content
 loadResults();

}]);
