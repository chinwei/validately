<template>
  <div class="app-bar">
    <svg v-on:click="goBack" class="link" width="150" height="50">
        <use xlink:href="./static/assets/sprites.svg#logo"></use>
      </svg>
    <!-- <span>
      <span v-on:click="goBack">Projects Home</span>
    </span> -->

    <span>
      <button-primary v-if="!user.uid" label="Login with Facebook" v-on:action="loginUser"></button-primary>
    </span>

  

    <strong v-if="user.uid" v-on:click="logOut">{{user.displayName}}</strong>
  </div>
</template>


<script>

import firebase from 'firebase'
import firebaseui from 'firebaseui'
import ButtonPrimary from '@/components/ButtonPrimary'

export default {
  name: 'app-bar',
  created: function(){
  
  },
  methods: {
    goBack: function(){
        this.$router.replace("/")
    },
    loginUser: function(){

      console.log(this);
      var _this = this;

      var provider = new firebase.auth.FacebookAuthProvider();
      

      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.

        console.log(this);
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        _this.isLoggedIn = true;
        
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
    },
    logOut: function(){
      var _this = this;

      this.isLoggedIn = false
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        // alert ("signed out");
        _this.$router.go("/")
        

      }).catch(function(error) {
        // An error happened.
      });
    }
  },
  components: {
    ButtonPrimary
  },
  props: {
    user: {}
  },
  data () {
    return {
      isLoggedIn: false
    }
  }
}
</script>

<style>
  .app-bar {
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    background: white;
    border-bottom: 1px #f3f3f3 solid;
  }
</style>