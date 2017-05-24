var app = angular.module("news_list_angular", [ 'ui.router' ]);
app.controller("newsListController", function($scope, $http) {

	$scope.loadMagasine = function() {

		$http.get(URLS.GET_MAGAZINE).success(function(data) {
			$scope.magasines = data;

		}).error(function(error) {
			Materialize.toast("NETWORK PROBLEME...");
		});

	};

	$scope.displayMagazineDetail = function(magazine){
		sessionStorage.setItem('magazine', JSON.stringify(magazine));
		window.location.href="article.html";
	}

});