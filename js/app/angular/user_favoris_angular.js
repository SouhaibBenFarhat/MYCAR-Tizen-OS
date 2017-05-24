var app = angular.module("user_favoris_angular", []);
app.controller("userFavorisController", function($scope, $http) {

	
	$scope.displayGammeDetail = function(gamme){
		sessionStorage.setItem('gamme', JSON.stringify(gamme));
		window.location.href="gamme_detail.html";
	}
	
	$scope.deleteUserFavoris=function(gamme){
		var user = JSON.parse(localStorage
				.getItem("currentUser"));

		console.log(gamme.id);
		console.log(user.userUID);
	
		
		$.post(URLS.DELETE_USER_FAVORIS, 
				{ gamme_id: gamme.id, user_id : user.userUID}, 
			    function(returnedData){
					Materialize.toast(returnedData);
					$scope.loadUserFavoris();
			}).fail(function(){
				Materialize.toast("Error");
			});

	}
	
	$scope.loadUserFavoris = function() {
		var userUid = JSON.parse(localStorage.getItem("currentUser")).userUID;
		$http.get(URLS.GET_USER_FAVORIS + userUid)
				.success(function(data) {
					$scope.favoris = data;
					console.log("&&&");
				}).error(function(error) {
					Materialize.toast("NETWORK PROBLEME...");
				});
	};

});
