var app = angular.module("concessionnaire_list_angular", [ 'ui.router' ]);
app.controller("concessionnaireListController", function($scope, $http) {

	$scope.loadConcessionnaire = function() {

		$http.get(URLS.GET_CONCESSIONNAIRE).success(function(data) {
			$scope.concessionnaires = data;

		}).error(function(error) {
			Materialize.toast("NETWORK PROBLEME...");
		});

	};
	$scope.displayConcessionnaireDetail = function(concessionnaire) {
		console.log(concessionnaire.id);
		sessionStorage.setItem('concessionnaire', JSON.stringify(concessionnaire));
		window.location.href = "concessionnaire_detail.html";

	}
	

});