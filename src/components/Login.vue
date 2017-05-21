<template>
  <div>
    
    <p>{{user.displayName}}</p>
    <p>{{user.email}}</p>

    <button-primary label="Login with Facebook" v-on:action="loginUser"></button-primary>

  </div>
</template>

<script>

import firebase from 'firebase'
import firebaseui from 'firebaseui'
import $ from 'jquery'
import ButtonPrimary from '@/components/ButtonPrimary'



export default {
  name: 'login',
  mounted: function(){

    


    

  },
  methods: {
    loginUser: function(){

      console.log(this);
      var _this = this;

      var provider = new firebase.auth.FacebookAuthProvider();
      provider.addScope('user_birthday');

      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.

        console.log(this);
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        this.$router.replace("/projects/")
        console.log(user);

        // ...
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
  },
  components:{
    ButtonPrimary
  },
  data () {
    return {
      survey: {},
      user: {}
    }
  }
}
</script>
