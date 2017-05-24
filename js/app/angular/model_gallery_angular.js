var app = angular.module("model_galley_angular", [ 'ui.router' ]);
app.controller("modelGalleryController", function($scope, $http) {

	$scope.displayModelPhoto = function() {
		var m = JSON.parse(sessionStorage.model);
		$scope.model = JSON.parse(sessionStorage.model);
		$http.get(URLS.GET_PHOTO_BY_MODEL + m.id).success(function(data) {
			$scope.modelPhotos = data;
		}).error(function(error) {
			Materialize.toast("NETWORK PROBLEME...");
		});
	};

});