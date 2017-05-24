var app = angular.module("annonces_angular", []);
app.controller("annonceController", function($scope, $http, $timeout) {
	
	$scope.currentUser = JSON.parse(localStorage.getItem("currentUser"));
	
	

	
	$scope.loadAnnonces = function() {

		$http.get(URLS.GET_ALL_ANNONCES).success(function(data) {
			$scope.annonces = data;

		}).error(function(error) {
			Materialize.toast("NETWORK PROBLEME...");
		});

	};
	

	$scope.loadUsers = function(usId) {
		

	
		const ref = firebase.database().ref().child('tizen_users').child(usId);

		ref.on("value", function(snapshot) {

		    // Since this event will occur outside Angular's $apply scope, we need to notify Angular
		    // each time there is an update. This can be done using $scope.$apply or $timeout. We
		    // prefer to use $timeout as it a) does not throw errors and b) ensures all levels of the
		    // scope hierarchy are refreshed (necessary for some directives to see the changes)
		    $timeout(function() {
		      $scope.user = snapshot.val();
		  
		    });
		});
	}
	
	
	$scope.loadAnnoncePhotos = function(){
		$http.get(URLS.GET_ANNONCES_PHOTOS).success(function(data) {
			
			$scope.photos = data;	

			
		}).error(function(error){
			
			Materialize.toast("NETWORK PROBLEME...");
			
		});
	}
	
	$scope.annonceDetail = function(annonce){
	
		sessionStorage.setItem("annonce", JSON.stringify(annonce));
		window.location.href = "ann_detail.html";
		
	}
	
	
	$scope.loadAnnonceByUser = function(){
		$http.get(URLS.GET_ANNONCE_BY_USER + $scope.currentUser.userUID).success(function(data) {
			
			$scope.userAnnonce = data;	
			
		
			
		}).error(function(error){
			
			Materialize.toast("NETWORK PROBLEME...");
			
		});
		
	}
	
	$scope.loadSavedAnnonces = function(){
		
		$scope.savedAnnonces = JSON.parse(localStorage.getItem("annonce"));
			
	}
	$scope.removeAnnonce = function(annonce){
		
		var json = JSON.parse(localStorage["annonce"]);
		for (i=0;i<json.length;i++)
		            if (json[i].id == annonce.id) json.splice(i,1);
		localStorage["annonce"] = JSON.stringify(json);
		
		
		window.location.reload();
		
	}
	
	$scope.checkAnnonces = function(){
		
		if(localStorage.getItem("annonce" == null)){
			document.getElementById("emptyContent").style.display = "";
		}
		
		if(localStorage.getItem("annonce") != null){
			
			if (localStorage.getItem("annonce").length != 2){
				document.getElementById("emptyContent").style.display = "none";
							
			}
			
		}
		
		
		
	}
	
	
});