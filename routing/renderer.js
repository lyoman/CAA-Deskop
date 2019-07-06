var app = angular.module('caa-app', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'home.html'
	})
	.when('/register',{
		templateUrl: 'register.html'
	})
	.when('/courses',{
		templateUrl: 'courses.html'
	});
});