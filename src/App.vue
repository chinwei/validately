<template>
  <div id="app">
    
    <div id="fb-root"></div>



    <app-bar v-bind:user="user"></app-bar>
    <transition name="slide-fade">
      <router-view :user="user"></router-view>
    </transition>
  </div>
</template>

<script>
import firebase from 'firebase'
import AppBar from '@/components/AppBar'

var config = {
  apiKey: "AIzaSyA_2Bu81WuWrjLoJHP3EFDo41jYgNJ8BUM",
  authDomain: "validately-948d9.firebaseapp.com",
  databaseURL: "https://validately-948d9.firebaseio.com",
  projectId: "validately-948d9",
  storageBucket: "validately-948d9.appspot.com",
  messagingSenderId: "354991934469"
};
firebase.initializeApp(config);

export default {
  name: 'app',
  components: {
    AppBar
  },
  created: function(){
    var _this = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          console.log(user, "signed in!")
         _this.user = user

      } else {
        // console.log(_this.$route)
        console.log("not signed in")
      }
    });

    

  },
  data () {
    return {
      user: {}
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 0;
  margin: 0;
  
}

body {
  margin: 0;
  background: #F6F5F1;
}


h1 {
  margin: 0;
}

/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .3s ease;
  transition-delay: .35s;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}


.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

</style>
