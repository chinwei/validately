<template>
  <div class="content-container">
    <div class="banner">
      <div class="banner__content story-banner">
        
        <!-- {{project.owner}} -->

        <div class="profile" v-if="project.owner">
          <span class="l-flex-row">
            <div class="profile-image img-container">
              <img v-bind:src="project.owner.photoURL" alt="">
            </div>
            <div class="profile__name">{{project.owner.displayName}}</div>  
          </span>
          <span>
            <button-basic 
              v-if="project.owner.uid === user.uid" 
              label="Edit Project"
              modifiers="button--text"
              v-on:action="editProject">
            </button-basic>
          </span>
        </div>
        <h1>{{project.title}}</h1>
        <p>{{project.desc}}</p>

        <div>
          
          <svg v-on:click="onLikeTrigger" v-bind:class="{ active: likes }" class="like-icon u-spacing-mr-m" viewBox="0 0 100 100" width="24" height="24">
            <use xlink:href="/static/assets/sprites.svg#heart"></use>
          </svg>

          <svg v-on:click="shareToFB" class="facebook-icon" viewBox="0 0 100 100" width="24" height="24">
            <use xlink:href="/static/assets/sprites.svg#facebook"></use>
          </svg>

          

        </div>
        
      </div>
    </div>
  
    <div class="content">
        
        <!-- {{likedCount}} -->

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
import ButtonBasic from '@/components/ButtonBasic'
import LoginOverlay from '@/components/LoginOverlay'



export default {
  name: 'view-project',
  created: function(){

    var _this = this;



    this.projectDB = firebase.database().ref('projects/'+this.$route.params.id);
    
    this.getWriteupContents();
    this.updateLikes();
  },
  mounted: function(){

    this.initFBComments();
    this.getLikedCount();

  },
  props:{
    user:{}
  },
  watch: {
    user: function(val){
      this.updateLikes();
    }
  },
  components:{
    ButtonBasic,
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
    getWriteupContents(){
      var _this = this;
      this.writeupDB = firebase.database().ref('writeup/'+this.$route.params.id);
      
      this.writeupDB.once('value', function(snapshot) {
        _this.writeup = snapshot.val();
      });

    },
    updateLikes(){
      var _this = this;
      this.projectDB.once('value', function(snapshot) {
        _this.project = snapshot.val();

        var likesRef = firebase.database()
          .ref('users/'+_this.user.uid+'/likes/'+snapshot.key)

        likesRef.on("value", function(snapshot){
          _this.likes = snapshot.val() ? true : false
        })

      });
    },
    getLikedCount(){
      var _this = this;
      var LikedRef = firebase.database()
        .ref('projects/'+this.projectDB.key+'/liked/');

      LikedRef.on('value', function(snapshot){
        _this.likedCount = snapshot.numChildren()
      })
    },
    initFBComments(){
      // console.log("fb here? 1")

      window.fbAsyncInit = function() {
         FB.init({
           appId      : '526030481081547',
           xfbml      : true,
           version    : 'v2.1'
         });


       };
      
      (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=526030481081547";
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));


      if (typeof(FB) !== 'undefined') {
        FB.XFBML.parse();
      }

     

    },
    shareToFB: function(){
      FB.ui({
          method: 'share',
          display: 'popup',
          href: window.location.href
        }, function(response){});
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
  },
  head: {
      // To use "this" in the component, it is necessary to return the object through a function
      title: function () {
        return {
          inner: this.project.title
        }
      },
      meta: [
        { 
          property: 'og:title', 
          content: function () {
            return {
              inner: this.project.title
            }
          }
        },
        { 
          property: 'og:url', 
          content: window.location.href
        },
      ]
    }
}
</script>

<style lang="scss">

.profile {
  margin-bottom: 24px;
  justify-content: space-between;
  @extend .l-flex-row;
}

.profile__name {
  font-size: 0.9em;
  font-weight: 500;
}

.profile-image {
  margin-right: 8px;
}

.l-flex-row {
  display: flex;
  flex-direction: row;
  align-items: center;
}


</style>

