var app = angular.module("model_list_angular", [ 'ui.router' ]);
app.controller("modelListController", function($scope, $http) {

	var rating = 0;
	
	$scope.loadModels = function() {
		var brand = JSON.parse(sessionStorage.brand);
		$scope.brand = brand;
		$http.get(URLS.GET_MODEL_BY_BRAND + brand.id).success(function(data) {
			$scope.models = data;
			console.log(Brand.id);
		}).error(function(error) {
			Materialize.toast("NETWORK PROBLEME...");
		});

	};
	
	$scope.displayModelDetail = function(model){
		sessionStorage.setItem('model', JSON.stringify(model));
		
		var model = JSON.parse(sessionStorage.model);
		window.location.href="model_detail.html";
		
	}
	$scope.getEmptyStars = function(){
		var x  = 5 - rating;
		return new Array(x);   
		
	}
	
	$scope.getNumber = function() {
	    return new Array(rating);   
	}

	
	$scope.getModelRating = function(m){
		$http.get(URLS.GET_MODEL_RATING + m.id).success(function(data) {
			rating = Math.round(data);
			console.log("rating-rating-rating-rating-rating-rating-rating-rating-rating-");
			console.log(rating);
			
			$scope.getNumber();
			$scope.getEmptyStars()
		}).error(function(error) {
			Materialize.toast("NETWORK PROBLEME...");
		});
	}
	

});