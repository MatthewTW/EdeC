angular.module('EDeC')

	// super simple service
	// each function returns a promise object 
	.factory('Product', ['$http', '$routeParams', function($http, $routeParams) {
		return {
			get : function() {
				return $http.get('/api/product/' + $routeParams.idProduct);
			},
			post : function() {
				return $http.get('/api/product/' + $routeParams.idProduct);
			}
		}
	}]);