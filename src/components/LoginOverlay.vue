<template>
  <div v-bind:class="{'is--visible': isVisible}" class="overlay">
      <div class="overlay__content">
          <!-- <a v-on:click.prevent="hideOverlay" class="overlay__close-btn" href="#">Close</a> -->
          
          <button-basic 
          label="Close" 
          modifiers="button--text overlay__close-btn"
          v-bind:class="{'is--loading': isLoading}" 
          v-on:action="hideOverlay"></button-basic>

          <h1 class="modal__title">Help ideas grow</h1>
          <p>Join and help a grow a community of thinkers and creators</p>
           <button-basic 
           label="Login with Facebook" 
           modifiers="button--primary"
           v-bind:class="{'is--loading': isLoading}" 
           v-on:action="handleLogin"></button-basic>
      </div>
  </div>

</template>


<script>

import firebase from 'firebase'
import firebaseui from 'firebaseui'
import ButtonBasic from '@/components/ButtonBasic'
import { login, logout} from '../../utils/auth'

export default {
  name: 'login-overlay',
  methods: {
    handleLogin(){
      var _this = this;
      this.isLoading = true;
      login(function(){
        _this.isLoading = false;
        _this.hideOverlay();
      })
    },
    loginUser: function(){

      console.log(this);
      var _this = this;

      _this.isLoading = true


      var provider = new firebase.auth.FacebookAuthProvider();
      

      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.

        console.log(this);
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;

        _this.isLoggedIn = true;

        _this.isLoading = false;

        _this.hideOverlay();
        // console.log(user);

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
    hideOverlay(){
      this.$emit("hideOverlay");
    }
  },
  components: {
    ButtonBasic
  },
  props: {
    user: {},
    isVisible: false
  },
  data () {
    return {
      isLoggedIn: false,
      isLoading: false,

    }
  }
}
</script>

<style>

.modal__title {
    font-size: 2em;
    font-weight: 500;
    display: block;
    margin-bottom: 0.5em;
}


.overlay {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  opacity: 0.98;
  z-index: 9999;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.overlay.is--visible {
  display: flex;
}
.overlay__content {
  text-align: center;
  width: 500px;
  position: relative;
  padding: 32px;
}

.overlay__close-btn {
  position: absolute;
  top: 0;
  right: 0;
}

.overlay--login {

}

</style>