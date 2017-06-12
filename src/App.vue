<template>
  <div id="app">
    
    <div id="fb-root"></div>



    <app-bar v-bind:user="user"></app-bar>
    <transition name="slide-fade">
      <router-view v-bind:user="user"></router-view>
    </transition>
  </div>
</template>

<script>
import firebase from 'firebase'
import fastclick from 'fastclick'
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
         _this.user = user;

         var users = firebase.database()
           .ref('/users/')
           .child(_this.user.uid)
           .once('value', function(snapshot){
             var exists = (snapshot.val() !== null);

             // console.log(window.location.pathname);

            if (!exists) {
              users = firebase.database().ref('/users/'+_this.user.uid).set({
                displayName: _this.user.displayName,
                email: _this.user.email,
                photoURL: _this.user.photoURL
              })
            } else {
              if (window.location.pathname == "/") _this.$router.replace("/projects");
            }

           })

      } else {
        _this.user = '';
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

<style lang="scss">

* {
    -webkit-touch-callout:none;                /* prevent callout to copy image, etc when tap to hold */
    -webkit-text-size-adjust:none;             /* prevent webkit from resizing text to fit */
    -webkit-tap-highlight-color:rgba(0,0,0,0); /* prevent tap highlight color / shadow */
    -webkit-user-select:'text';                  /* prevent copy paste, to allow, change 'none' to 'text' */
}


.content-container {
  padding-top: 60px;
  position: relative;
  z-index: 1;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: white;
  padding: 0;
  margin: 0;
  
}

.app-bar {
  position: fixed;
  top: 0;
  z-index: 9999;
}

body {
  margin: 0;
  // background: #F6F5F1;
}


h1 {
  margin: 0;
}

a {
  text-decoration: none;
  color: #333;
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




.like-icon {
  cursor: pointer;
  stroke: #ddd;
  stroke-width: 4px;
  fill: none;
  &:hover {
    fill: #f3f3f3;
    stroke: #f3f3f3;
  }
  &.active {
    fill: #FF4651; 
    stroke: #FF4651; 
  }
}

.facebook-icon {
  cursor: pointer;
  fill: #ccc;
  &:hover {
    fill: #aaa;
  }
}



.app-container {
  width: 600px;
  margin: 0 auto;
  text-align: left;
  padding: 32px;
}







.list__header {
  padding: 16px;
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px #f3f3f3 solid;
  margin-bottom: 1em;
  font-size: 1.2em;
}






img {
  width: 100%;
}

.content {
  background: white;
  padding: 60px 3vw 60px 3vw;
  max-width: 720px;
  margin: 0 auto;
  text-align: left;

}


.banner {
  padding: 60px 3vw 30px; 
  display: flex;
  align-items: center;
}

.banner--main {
  // background: url('/static/assets/header-bg.jpg') center center;
  background-size: cover;
  color: white;
  padding: 9em 3vw;
  justify-content: center;
}
  .banner__content {
    width: 720px;
    color: #333;
    text-align: center;
    margin: 0 auto;
  }


.banner__content p {
  margin-top: 0;
  margin-bottom: 2em;
}




.banner__title {
  font-size: 5em;
  font-weight: 500;
  display: block;
  margin-bottom: 0.5em;
}



.banner__content {
  text-align: left;
}

.banner--main .banner__content {
  text-align: center;
}

.banner__content h1 {
  font-size: 36px;
}

.banner__content p {
  font-size: 24px;
  margin-bottom: 2em;
}

.story {
  max-width: 720px;
  text-align: left;
  font-size: 18px;
  line-height: 1.5;
}


   .button-row {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
   }


  .input-text.is--hidden {
    opacity: 0;
  }



  .input--title {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
    font-size: 34px;
    background: none;
    border: none;
    font-weight: 600;
    outline: none;
    margin-bottom: 8px;
      width: 100%;
  }

  .input--title::placeholder {
    color: #BDBDBD;

  }


   .input-text.is--error::placeholder {
      color: #FF4651;
   }

  .input__long-text {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    display: block;
    color: #333333;
    font-size: 24px;
    border: 0;
    outline: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
    background: none;
      width: 100%;
      resize: none;
    opacity: 1;
    transition: opacity 0.3s ease;
  }

   .input__long-text::placeholder {
      color: #BDBDBD;
   }


  .list {
    margin-bottom: 4em;
  }


</style>
