var app = angular.module("gamme_detail_angular", [ 'ui.router' ]);
app.controller("gammeDetailController", function($scope, $http) {

	$scope.displayGammeDetail = function() {
		var g = JSON.parse(sessionStorage.gamme);
		$scope.brand = JSON.parse(sessionStorage.brand);
		$scope.gamme = JSON.parse(sessionStorage.gamme);
		$http.get(URLS.GET_PHOTO_BY_GAMME + g.id).success(function(data) {
			$scope.gammePhotos = data;
		}).error(function(error) {
			Materialize.toast("NETWORK PROBLEME...");
		});
	};

	$scope.getGammeCaracteristique = function() {
		var g = JSON.parse(sessionStorage.gamme);
		$http.get(URLS.GET_GAMME_CARACTERISTIQUE + g.caracteristique_id)
				.success(function(data) {
					$scope.caracteristique = data;
				}).error(function(error) {
					Materialize.toast("NETWORK PROBLEME...");
				});
	};
	$scope.getGammeMotorisation = function() {
		var g = JSON.parse(sessionStorage.gamme);
		$http.get(URLS.GET_GAMME_MOTORISATION + g.motorisation_id).success(
				function(data) {
					$scope.motorisation = data;
				}).error(function(error) {
			Materialize.toast("NETWORK PROBLEME...");
		});
	};

	$scope.addGammeToFavoris = function() {
		var g = JSON.parse(sessionStorage.gamme);
		var user = JSON.parse(localStorage.getItem("currentUser"));

		console.log(g.id);
		console.log(user.userUID);

		$.post(URLS.INSERT_INTO_FAVORIS, {
			id_gamme : g.id,
			id_user : user.userUID
		}, function(returnedData) {
			Materialize.toast(returnedData);
		}).fail(function() {
			Materialize.toast("error");
		});

	}

	$scope.addToComparator = function(gamme) {

		var comparatorArray = sessionStorage.getItem("comparatorArray");

		if (comparatorArray != null && comparatorArray.length < 2) {
			comparatorArray = comparatorArray + gamme.id;
			sessionStorage.setItem("comparatorArray", comparatorArray);
			if (comparatorArray.length == 2) {

				if (comparatorArray[0] == comparatorArray[1]) {
					Materialize.toast("You choose the same cars...");

				} else {

					Materialize.toast("redirection");
					window.location.href = "comparator.html";
					console.log(comparatorArray);
				}
			}
		} else {
			comparatorArray = gamme.id;
			sessionStorage.setItem("comparatorArray", comparatorArray);
			console.log(comparatorArray);
			Materialize.toast("Added to Comparator");

		}

	}

});