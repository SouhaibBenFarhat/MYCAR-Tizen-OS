var app = angular.module("filter_angular", [ 'ui.router' ]);
app.controller("filterController", function($scope, $http) {

	$scope.loadFilterResult = function() {
		
		var filter = JSON.parse(sessionStorage.getItem('filter'));

		$http.get(URLS.FILTER+"brand_id="+filter.brand_id+"&body_cars_id="+filter.body_cars_id+"&fuel_type="+
				filter.fuel_type+"&prix_max="+filter.prix_max+"&prix_min="+filter.prix_min).success(function(data) {
			$scope.gammes = data;

		}).error(function(error) {
			Materialize.toast("NETWORK PROBLEME...");
		});

	};

	$scope.displayGamme = function(gamme) {
		console.log(gamme.id);
		sessionStorage.setItem('gamme', JSON.stringify(gamme));
		window.location.href = "gamme_detail.html";

	}

});
