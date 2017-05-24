var app = angular.module("news_detail_angular", [ 'ui.router' ]);
app.controller("newsDetailController", function($scope, $http) {

	$scope.htmlToPlaintext = function(text) {
		  return text ? String(text).replace(/<[^>]+>/gm, '') : '';
		}
	
	$scope.displayNewsDetail = function(){
		var m = JSON.parse(sessionStorage.magazine);
		m.description = $scope.htmlToPlaintext(m.description);
		$scope.firstCapital = m.description.charAt(0);
		m.description = m.description.substr(1);
		$scope.magazine =m;
	}

});