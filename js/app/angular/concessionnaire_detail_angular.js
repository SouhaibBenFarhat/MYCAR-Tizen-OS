var app = angular.module("concessionnaire_detail_angular", [ 'ui.router' ]);
app.controller("concessionnaireDetailController", function($scope, $http) {

	

	$scope.displayConcessionnaireDetail = function() {
		$scope.concessionnaire = JSON.parse(sessionStorage.getItem('concessionnaire'));
		$scope.initMap();
	}
	
	$scope.initMap = function(){
		
		var latlng = {lat: parseFloat($scope.concessionnaire.lat), lng:parseFloat($scope.concessionnaire.lng)};
		
		var map = new google.maps.Map(document.getElementById("map"),{
			center:latlng,
			zoom:14
		});
		
		var marker = new google.maps.Marker({
			position:latlng,
			map:map,
			title:$scope.concessionnaire.name
		});
	}
	
	

});

