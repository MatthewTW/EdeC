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
			.when('/plans/subsidy/:subsid', {
		  		templateUrl: 'views/planSubsidy.html',
		    	controller: 'PlanSubsidyCtrl'
		  	})
		  	.when('/plans/listing/:subsidy', {
		    	templateUrl: 'views/planList.html',
		    	controller: 'PlanListCtrl'
		  	})
		  	.when('/plans/details/:id', {
		    	templateUrl: 'views/planDetails.html',
		    	controller: 'PlanDetailsCtrl'
		  	})
		  	.when('/plans/compare/:plansIds', {
		    	templateUrl: 'views/planComparison.html',
		    	controller: 'PlanComparisonCtrl'
		  	})
		  	.when('/faqs', {
				templateUrl: 'views/faqs.html'
			})
			.when('/product/:idProduct', {
				templateUrl: 'views/product.html',
				controller: 'ProductCtrl'
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
