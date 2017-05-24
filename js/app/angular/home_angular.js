var app = angular.module("home_angular", [ 'ui.router' ]);
app
		.controller(
				"homeController",
				function($scope, $http) {
					$scope.show = false;
					$scope.selectedBrand = [];
					$scope.selectedBodyCar = [];
					$scope.selectedFuel = [];
					$scope.fuelTypes = [ "ESSENCE", "DIESEL", "HYBRID" ];
					$scope.noLimit = false;

					$scope.loadFeaturedCars = function() {

						$http.get(URLS.GET_FEATURED_CARS_LIMIT).success(
								function(data) {
									$scope.featuredCars = data;

								}).error(function(error) {
							Materialize.toast("NETWORK PROBLEME...");
						});

					};

					$scope.loadBodyCars = function() {

						$http.get(URLS.GET_BODY_CARS).success(function(data) {
							$scope.bodyCars = data;

						}).error(function(error) {
							Materialize.toast("NETWORK PROBLEME...");
						});

					};

					$scope.loadMagazine = function() {
						$http.get(URLS.GET_MAGAZINE).success(function(data) {
							$scope.magazines = data;
						}).error(function(error) {
							Materialize.toast("ENABLE TO LOAD NEWS...");

						});
					}
					$scope.loadConcessionnaire = function() {
						$http
								.get(URLS.GET_CONCESSIONNAIRE)
								.success(function(data) {
									$scope.concessionnaires = data;
								})
								.error(
										function(error) {
											Materialize
													.toast("ENABLE TO LOAD CONCESSIONNAIRE...");

										});
					}
					$scope.loadBrands = function() {
						$scope.show = false;

						$http.get(URLS.GET_BRANDS).success(function(data) {
							$scope.brands = data;
							$scope.show = true;

						}).error(function(error) {
							Materialize.toast("ENABLE TO LOAD BRANDS...");
						});
					}

					$scope.setSelectedBrand = function(b) {
						$scope.selectedBrand.splice(0,
								$scope.selectedBrand.length);
						$scope.selectedBrand.push(b);
						document.getElementById(b.id).style.backgroundColor = 'rgba(217,0,0,0.19)';

						for (var i = 0; i < $scope.brands.length; i++) {
							if ($scope.brands[i].id != b.id
									&& document
											.getElementById($scope.brands[i].id) != null) {
								document.getElementById($scope.brands[i].id).style.backgroundColor = '#ffffff';
							}
						}
					}

					$scope.setSelectedBodyCar = function(bc) {
						$scope.selectedBodyCar.splice(0,
								$scope.selectedBodyCar.length);
						$scope.selectedBodyCar.push(bc);
						document.getElementById($scope.selectedBodyCar[0].body).style.border = '2px solid #d90000';

						for (var i = 0; i < $scope.bodyCars.length; i++) {
							if ($scope.bodyCars[i].body != bc.body) {
								document
										.getElementById($scope.bodyCars[i].body).style.border = '0px solid #ffffff';
							}
						}
						console.log($scope.selectedBodyCar.length);
						console.log($scope.selectedBodyCar[0].body);
					}

					$scope.setSelectedFuel = function(fuel) {
						$scope.selectedFuel.splice(0,
								$scope.selectedFuel.length);
						$scope.selectedFuel.push(fuel);
						document.getElementById($scope.selectedFuel[0]).style.border = '2px solid #d90000';

						for (var i = 0; i < $scope.fuelTypes.length; i++) {
							if ($scope.fuelTypes[i] != fuel) {
								document.getElementById($scope.fuelTypes[i]).style.border = '0px solid #d90000';
							}
						}
						console.log($scope.selectedFuel.length);
						console.log($scope.selectedFuel[0]);
					}

					$scope.runFilter = function() {

						console.log($scope.selectedBrand[0].name);
						console.log($scope.selectedBodyCar[0].body);
						console.log($scope.selectedFuel[0]);

						var check = document.getElementById("noLimitCheck");
						if (check.checked == true) {
							$scope.minPrice = 0;
							$scope.maxPrice = 99999999;

						}
						console.log($scope.minPrice);
						console.log($scope.maxPrice);
						
						var filter = {
								brand_id:$scope.selectedBrand[0].id,
								body_cars_id:$scope.selectedBodyCar[0].id,
								fuel_type:$scope.selectedFuel[0],
								prix_max:$scope.maxPrice,
								prix_min:$scope.minPrice
						};
						console.log(filter);
						sessionStorage.setItem('filter', JSON.stringify(filter));
						window.location.href = "filter_result.html";

					}
					
					
					$scope.displayModel = function(brand) {
						console.log(brand.id);
						sessionStorage.setItem('brand', JSON.stringify(brand));
						window.location.href = "models_list.html";

					}

				});