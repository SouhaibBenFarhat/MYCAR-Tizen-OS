var app = angular.module("add_annonce_angular", []);
app
		.controller(
				"addAnnonceController",
				function($scope, $http) {

					$scope.currentUser = JSON.parse(localStorage
							.getItem("currentUser"));

					$scope.loadYears = function() {

						$http.get(URLS.GET_YEARS).success(function(data) {
							$scope.years = data;
							

						}).error(function(error) {
							Materialize.toast("NETWORK PROBLEME...");
						});

					};

					$scope.loadBrandsByYear = function() {

						$http.get(
								URLS.GET_MAKE_YEARS + $scope.selectedYear.year)
								.success(function(data) {
									$scope.brandByYear = data;

								}).error(function(error) {
									Materialize.toast("NETWORK PROBLEME...");
								});

					};

					$scope.loadModelsByYearAndBrand = function() {

						$http.get(
								URLS.GET_MODEL_BY_YEAR_AND_BRAND
										+ "?make_year="
										+ $scope.selectedYear.year
										+ "&make_id=" + $scope.brand.id)
								.success(function(data) {
									$scope.models = data;

								}).error(function(error) {
									Materialize.toast("NETWORK PROBLEME...");
								});

					};

					$scope.selectedBrand = function(b) {
						$scope.brand = b;
						$scope.loadModelsByYearAndBrand();
						Materialize.toast("Selected brand : " + b.name);

					}

					$scope.getDatetime = function() {
						return (new Date).toLocaleFormat("%A, %B %e, %Y");
					};

					$scope.addAnnonce = function() {
						
						
						var date = new Date();
						var currentDate = date.toString().split("GMT");
						
						$
						.post(
								URLS.ADD_USER_ANNONCE,
								{
									type : $scope.selectedType,
									brand_id : $scope.brand.id,
									model : $scope.selectedModel.name,
									annee : $scope.selectedYear.year,
									transmission : $scope.selectedTransmission,
									puissance_fiscal : $scope.horse,
									kilometrage : $scope.km,
									couleur : $scope.color,
									nb_porte : $scope.selectedDoors,
									carburant : $scope.selectedFuel,
									prix : $scope.price,
									num_tel : $scope.phone,
									etat : $scope.selectedState,
									category : $scope.selectedType,
									date_mise_circulation : $scope.selectedDate,
									autre_description : $scope.description,
									date_publication : currentDate[0],
											
									user_id : $scope.currentUser.userUID
								},
								function(returnedData) {
									Materialize.toast(returnedData);

									$http
											.get(
													URLS.GET_LAST_USER_ANNONCE_ID
															+ $scope.currentUser.userUID)
											.success(
													function(data) {
														$scope.lastAnnonceId = data[0].id;
														console
																.log("/-/-/-/-/-/-/-/-/");
														console
																.log($scope.lastAnnonceId);
														$scope
																.uploadFile("file-input_front");
														$scope
																.uploadFile("file-input_right");
														$scope
																.uploadFile("file-input_back");
														$scope
																.uploadFile("file-input_left");

													})
											.error(
													function(error) {
														Materialize
																.toast("NETWORK PROBLEME...");
													});

								}).fail(function() {
							Materialize.toast("error");
						});

			}

			$scope.uploadFile = function(fileId) {
				console
						.log("-----------------------------------------");
				console
						.log("-----------------------------------------");
				console
						.log("-----------------------------------------");

				console.log(fileId);
				var date = new Date();
				var picture = document.getElementById(fileId).files[0];

				var storageRef = firebase.storage().ref(
						"annonce_photo_tizen/" + picture.name
								+ user.UID + date.toString());

				var task = null;
				// Upload file
				if (picture) {

					var uploadTask = storageRef.child(
							'images/rivers.jpg').put(picture);
					uploadTask
							.on(
									'state_changed',
									function(snapshot) {
										var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
										console.log('Upload is '
												+ progress + '% done');
										switch (snapshot.state) {
										case firebase.storage.TaskState.PAUSED: // or
																				// 'paused'
											console
													.log('Upload is paused');
											break;
										case firebase.storage.TaskState.RUNNING: // or
																					// 'running'
											console
													.log('Upload is running');
											break;
										}
									},
									function(error) {
										// Handle unsuccessful uploads
									},
									function() {
										// Handle successful uploads on
										// complete
										// For instance, get the
										// download URL:
										// https://firebasestorage.googleapis.com/...
										var downloadURL = uploadTask.snapshot.downloadURL;
										console.log(downloadURL);

										$
												.post(
														URLS.INSERT_USER_ANNONCE_PHOTO_TIZEN,
														{
															annonce_id : $scope.lastAnnonceId,
															image_url : downloadURL
														},
														function(
																returnedData) {

															Materialize
																	.toast(returnedData);

														})
												.fail(
														function(error) {
															Materialize
																	.toast("Network Error...");

														});

									});

				}

			}

						
					
						

						

					

				});