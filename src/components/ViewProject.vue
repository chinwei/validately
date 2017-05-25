<template>
  <div>
    <div class="banner">
      <div class="banner__content">
        <h1>{{project.title}}</h1>
        <p>{{project.desc}}</p>
        <button-primary label="Subscribe" v-on:action="toggleLike"></button-primary>
      </div>
    </div>
  
    <div class="content">
  

      <button-primary v-if="project.owner === user.uid" 
        label="Edit Project" v-on:action="editProject"></button-primary>
     
        <p v-if="owner">Idea by {{owner.displayName}}</p>
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

export default {
  name: 'view-project',
  created: function(){

    var _this = this;

    this.projectDB = firebase.database().ref('projects/'+this.$route.params.id);
    this.writeupDB = firebase.database().ref('writeup/'+this.$route.params.id);
   
    this.projectDB.once('value', function(snapshot) {
      
      _this.project = snapshot.val();

      // console.log("key:",this.projectDB.key);

      var owner = firebase.database().ref('users/'+_this.project.owner);

      owner.once('value', function(snapshot) {
        _this.owner = snapshot.val();
        
      });
    });

    this.writeupDB.once('value', function(snapshot) {
      _this.writeup = snapshot.val();
    });

    
  },
  mounted: function(){

    var FB;
    

    (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=526030481081547";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

    if (FB) FB.XFBML.parse();

  },
  props:{
    user: {}
  },
  components:{
    ButtonPrimary
  },
  methods: {
    goBack: function(){
        this.$router.replace("/projects/")
    },
    editProject: function(){
      this.$router.push(this.$route.path+"/edit")
    },
    toggleLike: function(){

      console.log('users/'+this.user.uid+'/likes/'+this.projectDB.key);
      
      var likesRef = firebase.database().ref('users/'+this.user.uid+'/likes/'+this.projectDB.key)

      // likesRef.set()

      likesRef.transaction(function(currentLikes) {
        console.log("currentLikes:",currentLikes)


          currentLikes = !currentLikes;

          if (!currentLikes) currentLikes = null;


        return currentLikes;
      });
      
      



    }
  },
  data () {
    return {
      project: {},
      writeup: {},
      owner: {}
    }
  }
}
</script>

<style>

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

