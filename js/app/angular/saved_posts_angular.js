var app = angular.module("saved_annonce_angular", []);
app.controller("savedAnnonceController",function($scope, $http, $timeout) {
	
	$scope.loadSavedAnnonces = function(){
		
		$scope.annonces = localStorage.getItem("annonce");
		
		
	}
	
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
	
	
});
