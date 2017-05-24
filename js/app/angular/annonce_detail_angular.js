var app = angular.module("detail_annonce_angular", []);
app.controller("detailAnnonceController",function($scope, $http, $timeout) {
	
	$scope.loadAnnonce = function(){
		
		$scope.annonce = JSON.parse(sessionStorage.getItem("annonce"));
		
	}
	$scope.loadAnnonceBrand = function(){
		
		$http.get(URLS.GET_BRAND_BY_ID + $scope.annonce.brand_id).success(function(data) {
			
			$scope.brand =data[0];
			

		}).error(function(error) {
			Materialize.toast("NETWORK PROBLEME...");
		});
	}
	
	$scope.loadAnnonceUser = function() {
		
		var loadingIndicator = document.getElementById('loadingIndicator');
		
		
		const ref = firebase.database().ref().child('tizen_users').child($scope.annonce.user_id);

		ref.on("value", function(snapshot) {

		    // Since this event will occur outside Angular's $apply scope, we need to notify Angular
		    // each time there is an update. This can be done using $scope.$apply or $timeout. We
		    // prefer to use $timeout as it a) does not throw errors and b) ensures all levels of the
		    // scope hierarchy are refreshed (necessary for some directives to see the changes)
		    $timeout(function() {
		      $scope.user = snapshot.val();
		      
				
				loadingIndicator.hidden=true;
		  
		    });
		});
		
		
	}
	
	
	$scope.loadAnnoncePhotos = function(){
		$http.get(URLS.GET_ANNONCE_PHOTOS_BY_ANNONCE_ID + $scope.annonce.id).success(function(data) {
			
			$scope.photos = data;
			

			
		}).error(function(error){
			
			Materialize.toast("NETWORK PROBLEME...");
			
		});
	}
	
	$scope.makePhoneCall = function(number){
		var phoneNumber = number;
		var callType = new tizen.ApplicationControlData("http://tizen.org/appcontrol/data/call/type", ["voice"]);
		var appControl = new tizen.ApplicationControl("http://tizen.org/appcontrol/operation/call", number, null, null, [callType]);
			
		tizen.application.launchAppControl(appControl, "tizen.call", 
		    function() {
				console.log("-------------------");
				console.log("-------------------");
				console.log("launch appControl succeeded");
				console.log("-------------------");
				console.log("-------------------");
		        
		    }, function(e) {
		        /* Error handling */
		    }, null);
	}
	
	
	$scope.saveAnnonce = function(annonce){
		
		if(localStorage.getItem("annonce") == null){
			
			var annonces = [];
			annonces.push(annonce);
			localStorage.setItem("annonce", JSON.stringify(annonces));
		}
		
		
		else if (localStorage.getItem("annonce") != null) {
				var oldItems = JSON.parse(localStorage.getItem('annonce'));
				oldItems.push(annonce);
				localStorage.setItem('annonce', JSON.stringify(oldItems));
			  
			}
		
		
		Materialize.toast("Post saved !");
		
		
		
	}
		
});