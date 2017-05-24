
function signin(){
	
	var loadingIndicator = document.getElementById('loadingIndicator');
	loadingIndicator.hidden=false;
	var email = document.getElementById('login').value;
	var password = document.getElementById('login-psw').value;
	
	if (email == '' || password =='') {
		Materialize.toast('Please fill all fields...');
		var loadingIndicator = document.getElementById('loadingIndicator');
		loadingIndicator.hidden = true;
	}else{
	
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  console.log(errorCode);
		  console.log(errorMessage);
		  document.getElementById('error_content').innerHTML="";
		    document.getElementById('error').hidden=false;
		    document.getElementById('error_content').innerHTML=errorMessage;
		    var loadingIndicator = document.getElementById('loadingIndicator');
		    loadingIndicator.hidden = true;
		});
	
	firebase.auth().onAuthStateChanged(function(user) {
		  if (user) {
				console.log(user.email);
				storeCurrentUser();
		  } else {
		  }
		});
	}
	 
}

function storeCurrentUser() {
	var user = firebase.auth().currentUser;

	return firebase
			.database()
			.ref()
			.child('tizen_users')
			.child(user.uid)
			.once('value')
			.then(
					function(snapshot) {
					if (snapshot != null) {
						console.log("zab");
							localStorage.setItem("currentUser",JSON.stringify(snapshot.val()));
							var loadingIndicator = document.getElementById('loadingIndicator');
							loadingIndicator.hidden=true;
							window.location.href = 'index.html';
						}
					});
}

function register(){

	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	var confirm_password = document.getElementById('confirm-password').value;
	
	
	if (email == '' || password =='' || confirm_password == '') {
		Materialize.toast('Please fill all fields...');
	}else{
		if (password == confirm_password) {
			firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
				  // Handle Errors here.
				  var errorCode = error.code;
				  var errorMessage = error.message;
				  document.getElementById('error_content').innerHTML="";
				    document.getElementById('error').hidden=false;
				    document.getElementById('error_content').innerHTML=errorMessage;
				  
			});
			firebase.auth().onAuthStateChanged(function(user) {
				  if (user) {
					  writeUserData();
				  } else {
					  console.log(' not signed up...');
				  }
				});
		}else{
			Materialize.toast('Password is not the same...');
		}
	
	

	}
}

function writeUserData() {
	var user = firebase.auth().currentUser;
	var password = document.getElementById('password').value;
	var date = new Date();

	firebase
			.database()
			.ref()
			.child('tizen_users')
			.child(user.uid)
			.set({
						connectedWith : "tizen.application",
						email : user.email,
						password :password,
						profilePictureUri : "https://firebasestorage.googleapis.com/v0/b/carsstore-1c8c5.appspot.com/o/profile_picture%2Fuser.jpg?alt=media&token=ad2781df-e1f2-40f8-8a27-273494ec33a6",
						provider : "firebase",
						signedIn : date.toString(),
						userUID : user.uid
					},function(error){
						if (error) {
							
						}else{
							window.location.href = 'login.html';
						}
					});
}


function FBLogin(){
	var oauthurl = "https://www.facebook.com/dialog/oauth?";
	var client_id = "211656199259430";
	var redirect_uri = "https://www.facebook.com/connect/login_success.html";
	var scope = "public_profile,email,user_friends,user_photos,user_hometown,user_location,read_custom_friendlists,user_photos";
	var final_uri = oauthurl + 'client_id=' + client_id + '&redirect_uri=' + redirect_uri + "&scope=" + scope;
	 
    console.log("inside login");
    window.authWin = window.open(final_uri, "blank", "", true);
    montiorURL();
}

function montiorURL() {
	console.log("montiorURL");
    window.int = self.setInterval(function () {
        window.authCount = window.authCount + 1;

        if (window.authWin && window.authWin.location) { 
            var currentURL = window.authWin.location.href;
            var inCallback = currentURL.indexOf("?code");
            if (inCallback >= 0) {
                var codeData = currentURL.substr(currentURL.indexOf("="));
                var code=codeData.substring(1);
                getAccesstoken(code);
            }
        }
        if (window.authCount > 30) {
            alert('30 seconds time out');
            window.authCount  =0;
            window.clearInterval(int)
            window.authWin.close();
        }
	}, 500);
}

function  getAccesstoken(code){
    $.ajax({
        type : "GET",
        url :'https://graph.facebook.com/oauth/access_token?client_id=211656199259430&redirect_uri=https://www.facebook.com/connect/login_success.html&client_secret=398f1070cfb4c1a9d1a45c191312d998&code='+code,
        success : function(data) {
        	
            try {
            	console.log("getAccesstoken acess success");
                access_token=parseToken(data);
                localStorage['accesstoken']=access_token;
                window.clearInterval(int)
                window.authWin.close();
                getProfile();
            }
            catch (e) {
                console.log(e);
            }
        },
        error : function() {
            console.log("acess token error");
        }
    });    
}

function parseToken(accesstoken){
    var c = accesstoken.indexOf('access_token') ; 
    var L = accesstoken.indexOf('&expires') ;
    var y = accesstoken.substring(0, c) + accesstoken.substring(L, accesstoken.length);
    var remaining = accesstoken.replace(y,'');
    return (remaining.substring(13));
}
 
function getProfile() {
	$.ajax({
        type : "GET",
        dataType : 'json',
        url : 'https://graph.facebook.com/me?fields=email,first_name,last_name,education,location,languages,hometown,picture&permissions=read_stream&access_token=' +localStorage['accesstoken'] ,
        success : function(data) {
	        console.log("getProfile() data = " + data);
            signupUserByFacebook(data);	
        },
        error : function() {
            console.log("Unable to get your friends on Facebook");
        }
    });
}


function signupUserByFacebook(data){
	var randomPassword = data.first_name+data.last_name;
	firebase.auth().createUserWithEmailAndPassword(data.email,randomPassword ).then(function(user){

				  var date = new Date();
					firebase
							.database()
							.ref()
							.child('tizen_users')
							.child(user.uid)
							.set({
										connectedWith : "tizen.application",
										email : user.email,
										password :randomPassword,
										profilePictureUri : data.picture.data.url,
										provider : "facebook",
										signedIn : date.toString(),
										userUID : user.uid,
										user_first_name : data.first_name,
										user_last_name : data.last_name
									},function(error){
										if (error) {
											
										}else{
											return firebase
											.database()
											.ref()
											.child('tizen_users')
											.child(user.uid)
											.once('value')
											.then(
													function(snapshot) {
													if (snapshot != null) {
															localStorage.setItem("currentUser",JSON.stringify(snapshot.val()));
															window.location.href = 'index.html';
														}
													});
										}
									});
			  
		
		
	}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  if (errorCode === "auth/email-already-in-use"){  
				firebase.auth().signInWithEmailAndPassword(data.email,randomPassword ).catch(function(error) {
					  var errorCode = error.code;
					  var errorMessage = error.message;
					  console.log(errorCode);
					  console.log(errorMessage);
					});			
				firebase.auth().onAuthStateChanged(function(user) {
					  if (user) {
						  return firebase
							.database()
							.ref()
							.child('tizen_users')
							.child(user.uid)
							.once('value')
							.then(
									function(snapshot) {
									if (snapshot != null) {
											localStorage.setItem("currentUser",JSON.stringify(snapshot.val()));
											var loadingIndicator = document.getElementById('loadingIndicator');
											loadingIndicator.hidden=true;
											window.location.href = 'index.html';
										}
									});				
					  } else {
					  }
					});  	  
		  }	  
	});
	
	
}



function Logout()
{
    $.ajax({
        type : "GET",
        url :'https://www.facebook.com/logout.php?next=https://www.facebook.com/connect/login_success.html&access_token='+localStorage['accesstoken'],
        success : function(data) {
            $.mobile.changePage("#Loginpage");        
        },
    	error: function(){console.log("error");}
    });
}
function closeAlert(){
	document.getElementById('error').hidden=true;
}