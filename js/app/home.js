function signOut() {
	Logout();

}

function hideAlert() {

	document.getElementById('modal3').removeAttribute("style");

}

function initHome() {
	console.log('zgsdg');
	var user = firebase.auth().currentUser;
	console.log(user.email);

}

function Logout() {
	$
			.ajax({
				type : "GET",
				url : 'https://www.facebook.com/logout.php?next=https://www.facebook.com/connect/login_success.html&access_token='
						+ localStorage['accesstoken'],
				success : function(data) {
					window.location.href = 'login.html';
				},
				error : function() {
					window.location.href = 'login.html';
				}
			});
}