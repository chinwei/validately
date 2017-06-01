<template>
  <div v-bind:class="{'is--visible': isVisible}" class="overlay">
      <div class="overlay__content">
          <a v-on:click.prevent="hideOverlay" class="overlay__close-btn" href="#">Close</a>
          <svg class="link" width="150" height="50">
            <use xlink:href="./static/assets/sprites.svg#logo"></use>
          </svg>
          <h2>Join the community</h2>
          <p>GoCreate is a community for people to contribute and grow ideas. Join us :)</p>
           <button-primary 
           label="Login with Facebook" 
           v-bind:class="{'is--loading': isLoading}" 
           v-on:action="loginUser"></button-primary>
      </div>
  </div>

</template>


<script>

import firebase from 'firebase'
import firebaseui from 'firebaseui'
import ButtonPrimary from '@/components/ButtonPrimary'

export default {
  name: 'login-overlay',
  methods: {
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
    ButtonPrimary
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

<style scoped>

.overlay {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: white;
  opacity: 0.9;
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
  font-weight: 600;
}

.overlay--login {

}

</style>