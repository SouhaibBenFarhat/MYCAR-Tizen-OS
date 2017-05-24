var app = angular.module("brand_list_angular", [ 'ui.router' ]);
app.controller("brandsListController", function($scope, $http) {

	

	
	
	
	$scope.loadBrands = function() {

		$http.get(URLS.GET_BRANDS).success(function(data) {
			$scope.brands = data;

		}).error(function(error) {
			Materialize.toast("NETWORK PROBLEME...");
		});

	};

	$scope.displayModel = function(brand) {
		console.log(brand.id);
		sessionStorage.setItem('brand', JSON.stringify(brand));
		window.location.href = "models_list.html";

	}

});