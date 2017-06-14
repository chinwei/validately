import firebase from 'firebase'
import firebaseui from 'firebaseui'
import Router from 'vue-router';

// var provider = new firebase.auth.FacebookAuthProvider();

var router = new Router({
});

export function login() {

    var _this = this;

    firebase.auth().signInWithPopup(provider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.

      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  
}

export function logout() {
	
	firebase.auth().signOut().then(function() {
	
	router.replace('/');

	}).catch(function(error) {

	});
}

function checkLoggedIn(user) {
	// console.log(user);

	if (user) {
		return 'true'
	} else {
		return 'false'
	}

}

export function isLoggedIn() {

	firebase.auth().onAuthStateChanged(function(user) {
		checkLoggedIn(user);
	});

	return true
}


// isLoggedIn(checkLoggedIn);




function onComplete(a){ // When the code completes, do this
    alert(a);
}

function getFive(whenDone){ 
    var a;
    setTimeout(function(){
         a=5;
         whenDone(a);
    },10);
}



