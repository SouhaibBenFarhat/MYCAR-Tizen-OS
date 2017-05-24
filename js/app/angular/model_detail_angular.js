var app = angular.module("model_detail_angular", [ 'ui.router' ]);
app.controller("modelDetailController", function($scope, $http) {

	$scope.displayModelDetail = function() {
		var m = JSON.parse(sessionStorage.model);
		$scope.brand = JSON.parse(sessionStorage.brand);
		$scope.model = JSON.parse(sessionStorage.model);
		$http.get(URLS.GET_PHOTO_BY_MODEL + m.id).success(function(data) {
			$scope.modelPhotos = data;
		}).error(function(error) {
			Materialize.toast("NETWORK PROBLEME...");
		});
	};
	
	$scope.getEmptyStars = function(){
		var x  = 5 - $scope.rating;
		return new Array(x);   
		
	}
	
	$scope.getNumber = function() {
	    return new Array($scope.rating);   
	}

	
	$scope.getModelRating = function(){
		var m = JSON.parse(sessionStorage.model);
		$http.get(URLS.GET_MODEL_RATING + m.id).success(function(data) {
			$scope.rating = Math.round(data);
			console.log("rating-rating-rating-rating-rating-rating-rating-rating-rating-");
			console.log($scope.rating);
			
			$scope.getNumber();
			$scope.getEmptyStars()
		}).error(function(error) {
			Materialize.toast("NETWORK PROBLEME...");
		});
	}

	$scope.getGammeByModel = function() {
		var m = JSON.parse(sessionStorage.model);
		$http.get(URLS.GET_GAMME_BY_MODEL + m.id).success(function(data) {
			$scope.gammes = data;
		}).error(function(error) {
			Materialize.toast("NETWORK PROBLEME...");
		});
	};
	
	$scope.displayGammeDetail = function(gamme){
		sessionStorage.setItem('gamme', JSON.stringify(gamme));
		window.location.href="gamme_detail.html";
	}

});