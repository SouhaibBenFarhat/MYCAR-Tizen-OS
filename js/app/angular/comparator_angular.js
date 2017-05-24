var app = angular.module("comparator_angular", [ 'ui.router' ]);
app.controller("comparatorController", function($scope, $http) {

	$scope.loadFirstGamme = function() {
		var firstGammeId = JSON.parse(sessionStorage.getItem("comparatorArray")[0]);
		$http.get(URLS.GET_GAMME_BY_ID + firstGammeId).success(function(data) {
			$scope.firstGamme = data[0];
			$scope.getFirstGammeCaracteristique();
			$scope.getFirstGammeMotorisation();
			
			
			
			$http.get(URLS.GET_BRAND_BY_ID + $scope.firstGamme.brand_id).success(function(data) {
				$scope.firstGammeBrand = data[0];
			}).error(function(error) {
				Materialize.toast("NETWORK PROBLEME...");
			});

			
		}).error(function(error) {
			Materialize.toast("NETWORK PROBLEME...");
		});
	};
	
	
	$scope.loadSecondGamme = function() {
		var secondGammeId = JSON.parse(sessionStorage.getItem("comparatorArray")[1]);
		$http.get(URLS.GET_GAMME_BY_ID + secondGammeId).success(function(data) {
			$scope.secondGamme = data[0];
			$scope.getSecondGammeCaracteristique();
			$scope.getSecondGammeMotorisation();
			
			
			
			$http.get(URLS.GET_BRAND_BY_ID + $scope.secondGamme.brand_id).success(function(data) {
				$scope.secondGammeBrand = data[0];
			}).error(function(error) {
				Materialize.toast("NETWORK PROBLEME...");
			});
			
			
			
		}).error(function(error) {
			Materialize.toast("NETWORK PROBLEME...");
		});
	};
	
	$scope.getFirstGammeCaracteristique = function() {
		$http.get(URLS.GET_GAMME_CARACTERISTIQUE + $scope.firstGamme.caracteristique_id)
				.success(function(data) {
					$scope.firstGammeCaracteristique = data[0];
				}).error(function(error) {
					Materialize.toast("NETWORK PROBLEME...");
				});
	};
	
	$scope.getSecondGammeCaracteristique = function() {
		$http.get(URLS.GET_GAMME_CARACTERISTIQUE + $scope.secondGamme.caracteristique_id)
				.success(function(data) {
					$scope.secondGammeCaracteristique = data[0];
				}).error(function(error) {
					Materialize.toast("NETWORK PROBLEME...");
				});
	};
	
	
	
	$scope.getFirstGammeMotorisation = function() {
		$http.get(URLS.GET_GAMME_MOTORISATION + $scope.firstGamme.motorisation_id).success(
				function(data) {
					$scope.firstGammeMotorisation = data[0];
				}).error(function(error) {
			Materialize.toast("NETWORK PROBLEME...");
		});
	};
	
	
	$scope.getSecondGammeMotorisation = function() {
		$http.get(URLS.GET_GAMME_MOTORISATION + $scope.secondGamme.motorisation_id).success(
				function(data) {
					$scope.secondGammeMotorisation = data[0];
				}).error(function(error) {
			Materialize.toast("NETWORK PROBLEME...");
		});
	};
	
});