var app = angular.module("featured_cars_angular", [ 'ui.router' ]);
app.controller("featuredCarsController", function($scope, $http) {

	$scope.loadFeaturedCars = function() {

		$http.get(URLS.GET_FEATURED_CARS).success(function(data) {
			$scope.featuredCars = data;

		}).error(function(error) {
			Materialize.toast("NETWORK PROBLEME...");
		});

	};

	

});