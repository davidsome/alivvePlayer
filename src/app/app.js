'use strict';

var app = angular.module('alivve', [
	'ui.bootstrap',
	]);

app.run(['$rootScope','$timeout','$http',
    function ($rootScope,$timeout,$http) {
    
    console.log('start app');

}]);

app.controller('topCtrl',['$scope',function($scope){

}]);