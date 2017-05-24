var app = angular.module("user_profile_angular", []);
app.controller("userProfileController", function($scope, $http) {
	
	
	
	
	firebase.auth().onAuthStateChanged(function(user) {
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
									document.getElementById('display_user_email').innerHTML = snapshot.val().email;
									document.getElementById('display_user_name').innerHTML = snapshot.val().user_first_name+ " " + snapshot.val().user_last_name;
									document.getElementById('display_user_age').innerHTML = snapshot.val().user_age;
									document.getElementById('display_user_address').innerHTML = snapshot.val().user_address;
									document.getElementById('display_user_city').innerHTML = snapshot.val().user_city;
									document.getElementById('display_user_phone').innerHTML = snapshot.val().user_phone;
									document.getElementById('main_username').innerHTML = snapshot.val().user_first_name+ " " + snapshot.val().user_last_name
									document.getElementById("user_profile_picture").src = snapshot.val().profilePictureUri;
								
								
									document.getElementById('user_age').value=snapshot.val().user_age;
									document.getElementById('user_first_name').value = snapshot.val().user_first_name;
									document.getElementById('user_last_name').value = snapshot.val().user_last_name;
									document.getElementById('user_address').value= snapshot.val().user_address;
									document.getElementById('user_city').value= snapshot.val().user_city;
									document.getElementById('user_phone').value= snapshot.val().user_phone;
									
									
									document.getElementById('age-label').className='active';
									document.getElementById('first-name-label').className='active';
									document.getElementById('last-name-label').className='active';
									document.getElementById('address-label').className='active';
									document.getElementById('city-label').className='active';
									document.getElementById('phone-label').className='active';
								}
							});
			
			
			

		} else {
			Materialize.toast("NETWORK PROBLEM...");
		}
	});
	

});


