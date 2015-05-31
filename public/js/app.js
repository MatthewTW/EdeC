angular.module('EDeC', ['ngCookies', 'ngResource', 'ngMessages', 'ngRoute', 'mgcrea.ngStrap'])
	.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	
		$locationProvider.html5Mode(true);

		$routeProvider
			.when('/homepage', {
				templateUrl: 'views/homepage.html',
				controller: 'HomepageCtrl'
			})
			.when('/register', {
				templateUrl: 'views/register.html',
				controller: 'RegisterCtrl'
			})
			.when('/login', {
				templateUrl: 'views/login.html',
				controller: 'LoginCtrl'
			})
			.when('/about', {
				templateUrl: 'views/aboutUs.html'
			})
			.when('/terms', {
				templateUrl: 'views/termsAndConditions.html'
			})
			.when('/privacy', {
				templateUrl: 'views/privacyPolicy.html'
			})
			.when('/products/:pager', {
				templateUrl: 'views/products.html',
				controller: 'ProductsCtrl'
			})
		  	.when('/faqs', {
				templateUrl: 'views/faqs.html'
			})
			.when('/product/:idProduct', {
				templateUrl: 'views/product.html',
				controller: 'ProductCtrl'
			})
			.when('/product/:idProduct/comments/:pager', {
				templateUrl: 'views/comments.html',
				controller: 'CommentsCtrl'
			})
			.when('/profile', {
				templateUrl: 'views/profile.html',
				controller: 'ProfileCtrl'
			})
		  	.otherwise({
		    	redirectTo: '/homepage'
		  	});
	}])
	.filter('range', function() {
        return function(input, total) {
            total = parseInt(total);
            for (var i=0; i < total; i++)
                input.push(i);
            return input;
        }
    });
