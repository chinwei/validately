<template>
  <div>
    <login-overlay v-on:hideOverlay="hideOverlay" v-bind:isVisible="isVisible"></login-overlay>
    <div class="banner">
      <div class="banner__content story-banner">
        <h1>{{project.title}}</h1>
        <p>{{project.desc}}</p>

        <svg v-on:click="onLikeTrigger" v-bind:class="{ active: likes }" class="like-icon" viewBox="0 0 100 100" width="40" height="40">
          <use xlink:href="./static/assets/sprites.svg#heart"></use>
        </svg>

      </div>
    </div>
  
    <div class="content">
  

      <button-primary v-if="project.owner && project.owner.uid === user.uid" 
        label="Edit Project" v-on:action="editProject"></button-primary>
     
    

        <p v-if="project.owner">Idea by {{project.owner.displayName}}</p>
      <article class="story">

   

        <div v-if="writeup" v-html="writeup.content"></div>
  

        <div class="fb-comments" data-numposts="5"></div>
        
      </article>
      
    </div>


    </div>
</template>

<script>

import firebase from 'firebase'
import $ from 'jquery'
import ButtonPrimary from '@/components/ButtonPrimary'
import LoginOverlay from '@/components/LoginOverlay'

export default {
  name: 'view-project',
  created: function(){

    var _this = this;

    this.projectDB = firebase.database().ref('projects/'+this.$route.params.id);
    this.writeupDB = firebase.database().ref('writeup/'+this.$route.params.id);
    
   
    this.projectDB.once('value', function(snapshot) {
      
      _this.project = snapshot.val();

      var likesRef = firebase.database()
        .ref('users/'+_this.user.uid+'/likes/'+snapshot.key)

      likesRef.on("value", function(snapshot){

        _this.likes = snapshot.val() ? true : false

      })

    });

    this.writeupDB.once('value', function(snapshot) {
      _this.writeup = snapshot.val();
    });

  },
  mounted: function(){

    var FB;
    var _this = this;
    

    (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=526030481081547";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

    if (FB) FB.XFBML.parse();



    var LikedRef = firebase.database().ref('projects/'+this.projectDB.key+'/liked/');

    LikedRef.on('value', function(snapshot){

      _this.likedCount = snapshot.numChildren()
    })



  },
  props:{
    user: {}
  },
  watch: {
    user: function(val){
      var _this = this;
      console.log("user changed!", val)

      this.projectDB.once('value', function(snapshot) {
        
        _this.project = snapshot.val();

        var likesRef = firebase.database()
          .ref('users/'+_this.user.uid+'/likes/'+snapshot.key)

        likesRef.on("value", function(snapshot){

          _this.likes = snapshot.val() ? true : false

        })

      });


    }
  },
  components:{
    ButtonPrimary,
    LoginOverlay
  },
  methods: {
    hideOverlay(){
      this.isVisible = false
    },
    goBack: function(){
        this.$router.replace("/projects/")
    },
    editProject: function(){
      this.$router.push(this.$route.path+"/edit")
    },
    toggleLike: function(){
      
      var _this = this;

      var likesRef = firebase.database().ref('users/'+this.user.uid+'/likes/'+this.projectDB.key)

      var LikedRef = firebase.database().ref('projects/'+this.projectDB.key+'/liked/');
      
      likesRef.transaction(function(currentLikes) {

          currentLikes = !currentLikes;

          if (!currentLikes) currentLikes = null;

          _this.likes = currentLikes;

        return currentLikes;
      });

      console.log('user id:',this.user.uid)
      
      LikedRef.child(this.user.uid).transaction(function(currentLiked) {

          currentLiked = !currentLiked;

          if (!currentLiked) currentLiked = null;

        return currentLiked;
      });





    },
    onLikeTrigger(){
      if (this.user.uid) {
        this.toggleLike();
      } else {
        this.isVisible = true
      }
    }
  },
  data () {
    return {
      project: {},
      writeup: {},
      owner: {},
      likes: false,
      likedCount: '',
      isVisible: false
      
    }
  }
}
</script>

<style lang="scss">



.like-icon {
  cursor: pointer;
  stroke: #FF4651;
  stroke-width: 4px;
  fill: none;
  &:hover {
    fill: #FFD8DB;
  }
  &.active {
    fill: #FF4651; 
  }
}


.app-container {
  width: 600px;
  margin: 0 auto;
  text-align: left;
  padding: 32px;
}



img {
  width: 100%;
}

.content {
  background: white;
  padding: 60px;
}



.banner__content {
  text-align: left;
  width: 720px;
}

.banner__content h1 {
  font-size: 36px;
}

.banner__content p {
  font-size: 24px;
}

.story {
  max-width: 720px;
  text-align: left;
  font-size: 21px;
  line-height: 1.5;
}



</style>

