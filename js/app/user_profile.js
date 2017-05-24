function writeUserData() {
	var user = firebase.auth().currentUser;
	var age = document.getElementById('user_age').value;
	var first_name = document.getElementById('user_first_name').value;
	var last_name = document.getElementById('user_last_name').value;
	var address = document.getElementById('user_address').value;
	var city = document.getElementById('user_city').value;
	var phone = document.getElementById('user_phone').value;
	var date = new Date();
	var profilePicture = document.getElementById('file-input').files[0];

	var storageRef = firebase.storage()
			.ref(
					"profile_picture/" + "profile_picture" + user.UID
							+ date.toString());

	var task = null;
	// Upload file
	if (profilePicture) {
		task = storageRef.put(profilePicture);
		var url = null;

		task.on("state_changed",function progress(snapshot) {

							if (snapshot.downloadURL != null
									|| snapshot.downloadURL != undefined) {
								console.log("snapshot: ", snapshot.downloadURL);
								url = snapshot.downloadURL;}
						},
						function error(err) {
						},
						function complete() {
							firebase
									.database()
									.ref()
									.child('tizen_users')
									.child(user.uid)
									.set(
											{
												connectedWith : "tizen.application",
												email : user.email,
												user_age : age,
												user_first_name : first_name,
												user_last_name : last_name,
												user_address : address,
												user_city : city,
												user_phone : phone,
												profilePictureUri : url,
												provider : "firebase",
												signedIn : date.toString(),
												userUID : user.uid
											},
											function(error) {
												if (error) {

												} else {
													storeCurrentUser();
													document
															.getElementById('other_information').hidden = true;
													document
															.getElementById('profile_information_panel').hidden = false;
													displayUserData();
												}
											});
						}

				);

	}else{
		
		
		firebase
		.database()
		.ref()
		.child('tizen_users')
		.child(user.uid)
		.set(
				{
					connectedWith : "tizen.application",
					email : user.email,
					user_age : age,
					user_first_name : first_name,
					user_last_name : last_name,
					user_address : address,
					user_city : city,
					user_phone : phone,
					profilePictureUri : JSON.parse(localStorage.getItem("currentUser")).profilePictureUri,
					provider : "firebase",
					signedIn : date.toString(),
					userUID : user.uid
				},
				function(error) {
					if (error) {

					} else {
						storeCurrentUser();
						document
								.getElementById('other_information').hidden = true;
						document
								.getElementById('profile_information_panel').hidden = false;
						displayUserData();
					}
				});
		
		
	}

}

function storeCurrentUser() {
	var user = firebase.auth().currentUser;
	return firebase.database().ref().child('tizen_users').child(user.uid).once(
			'value').then(
			function(snapshot) {
				if (snapshot != null) {
					localStorage.setItem("currentUser", JSON.stringify(snapshot
							.val()));
					var profilePicture = document
							.getElementById('profile_picture');
					var username = document.getElementById('user');
					var currentUser = JSON.parse(localStorage
							.getItem('currentUser'));
					profilePicture.src = currentUser.profilePictureUri;
					username.innerHTML = currentUser.email;
				}
			});
}

function displayUserData() {
	firebase
			.auth()
			.onAuthStateChanged(
					function(user) {
						if (user) {
							var user = firebase.auth().currentUser;
							document.getElementById('email').innerHTML = user.email;
							document.getElementById('other_information').hidden = true;
							return firebase
									.database()
									.ref()
									.child('tizen_users')
									.child(user.uid)
									.once('value')
									.then(
											function(snapshot) {
												if (snapshot != null) {
													// console.log(JSON.stringify(snapshot.val()));
													document
															.getElementById('display_user_email').innerHTML = snapshot
															.val().email;
													document
															.getElementById('display_user_name').innerHTML = snapshot
															.val().user_first_name
															+ " "
															+ snapshot.val().user_last_name;
													document
															.getElementById('display_user_age').innerHTML = snapshot
															.val().user_age;
													document
															.getElementById('display_user_address').innerHTML = snapshot
															.val().user_address;
													document
															.getElementById('display_user_city').innerHTML = snapshot
															.val().user_city;
													document
															.getElementById('display_user_phone').innerHTML = snapshot
															.val().user_phone;
													document
															.getElementById('main_username').innerHTML = snapshot
															.val().user_first_name
															+ " "
															+ snapshot.val().user_last_name
													document
															.getElementById("user_profile_picture").src = snapshot
															.val().profilePictureUri;

												}
											});
						} else {
							Materialize.toast("NETWORK PROBLEM...");
						}
					});
}

function showUpdatePanel() {
	document.getElementById('other_information').hidden = false;
	document.getElementById('profile_information_panel').hidden = true;
}
function hideUpdatePanel() {
	document.getElementById('other_information').hidden = true;
	document.getElementById('profile_information_panel').hidden = false;
}