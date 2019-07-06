var app = angular.module('caa-app', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/',{
		templateUrl: 'home.html'
	})
	.when('/courses',{
		templateUrl: 'courses.html'
	})
	.when('/grades',{
		templateUrl: 'grades.html'
	})
	.when('/calander',{
		templateUrl: 'calander.html'
	})
	.when('/notifications',{
		templateUrl: 'notifications.html'
	})
	.when('/clickers',{
		templateUrl: 'clickers.html'
	})
	.when('/livechat',{
		templateUrl: 'livechat.html'
	})
	
	.when('/myfiles',{
		templateUrl: 'myfles.html'
	})

	.when('/library',{
		templateUrl: 'library.html'
	})

	.when('/contents',{
		templateUrl: 'contents.html'
	})

	.when('/chat',{
		templateUrl: 'chat.html'
	})

	.when('/logout',{
		templateUrl: 'logout.html'
	})

	.when('/con', {
		templateUrl: 'forums.html'
	})
	
});
