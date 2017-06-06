<template>
  <div class="container">
    <login-overlay v-on:hideOverlay="hideOverlay" v-bind:isVisible="isVisible"></login-overlay>
    <div class="banner banner--main">
      <div class="banner__content">
        <div class="banner__title">Enrich Your Ideas</div>
        <p class="banner__writeup">GoCreate is a community for people to contribute and grow ideas.</p>
        <button-primary
          label="Post a Project"
          v-on:action="goToNewProject"/>
      </div>
    </div>

    <div class="content">

      <article> 

        <div v-if="user.uid" class="list__header">
          <h1>Your Projects</h1>
          
        </div>

        <project-list-item 
          v-for="key, value in currentUserProjectObj"
          :key="key"
          v-bind:item="key"
          v-on:action="goToProject('projects/'+key.url)"/>


        <div v-if="user.uid" style="margin-top: 32px" class="list__header">
          <h1>Projects You Liked</h1>
        </div>

     

        <project-list-item 
          v-for="key, value in currentUserTargetObj.likes"
          :key="key"
          v-bind:item="projectObj[value]"
          v-on:action="goToProject('projects/'+projectObj[value].url)"/>


        <!-- <div class="list__header" style="margin-top: 32px">
          <h1>Recent Projects</h1>
         
        </div>

        <project-list-item 
          v-for="key, value in listArray" 
          :key="key"
          v-bind:item="key"
          v-on:action="goToProject('projects/'+key.url)"/> -->
  
      </article>
      
    </div>

    </div>
</template>

<script>

import firebase from 'firebase'
import _ from 'underscore'
import ProjectListItem from '@/components/ProjectListItem'
import ButtonPrimary from '@/components/ButtonPrimary'
import LoginOverlay from '@/components/LoginOverlay'


export default {
  name: 'project-list',
  created() {
    console.log(this.user)

    var _this = this;


    this.getCreatedProjects();
    this.getLikedProjects();

   var projectRef = firebase.database().ref('projects/');

    projectRef
      .orderByChild('time')
      .limitToLast(5)
      .on("child_added", function(snapshot){

      _this.projects.push(snapshot.val())
      _this.projectObj[snapshot.key] = snapshot.val()

    });
  },
  mounted() {

    var _this = this;


    var ref = firebase.database().ref('projects/');
    
    ref
      .orderByChild('time')
      .limitToLast(5)
      .on("value", function(snapshot){

      _this.projectObj = snapshot.val()

    });
  },
  components: {
    ProjectListItem,
    ButtonPrimary,
    LoginOverlay
  },
  props:{
    user: {}
  },
  methods:{
    goToProject: function(path){
      // console.log(this.user.uid)
      this.$router.push({ path: path })  
    },
    goToNewProject(){
      if (this.user.uid) {
        this.goToProject('/projects/new');
      } else {
        this.isVisible = true
      }
    },
    clickHandler() {
      this.$router.push({ path: path })
    },
    getCreatedProjects: function(){
      var _this = this;

      if (_this.user.uid) {
      firebase.database()
        .ref('projects/')
        .orderByChild('owner/uid')
        .equalTo(_this.user.uid)
        .limitToLast(5)
        .on("value", function(snapshot){
          _this.currentUserProjectObj = snapshot.val()
        });
      }
    },
    getLikedProjects: function(){
      var _this = this;

      if (this.user.uid) {
        firebase.database()
          .ref('users/'+this.user.uid)
          .on("value", function(snapshot){
          _this.currentUserTargetObj = snapshot.val();
        });
      }
    },
    hideOverlay(){
      this.isVisible = false
    }
  },
  computed: {
    listArray(){
      var list = _.map(this.projects, function(num, key){ 
        return num
      });
     
      var sortByDate = _.sortBy(list, function(num, key){

        return sortByDate;
      })
      
      return sortByDate.reverse();
    }
  },
  watch: {
    user: function (val) {

      console.log("user..", val)

      this.getCreatedProjects();
      this.getLikedProjects();

    },
  },
  data () {
    return {
      projects: [],
      projectObj: {},
      currentUserProjectObj: {},
      currentUserTargetObj: {},
      isVisible: false
    }
  }
}
</script>

<style lang="scss">




.content {
  text-align: left;
}

.list__header {
  padding: 16px;
  background: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}


.banner {
  padding: 60px 3vw 30px; 
  display: flex;
  align-items: center;
}

.banner--main {
  background: url('/static/assets/header-bg.jpg') center center;
  background-size: cover;
  color: white;
  padding: 0 3vw;
  height: 100vh;
  justify-content: center;
  

  .banner__content {
    width: 400px;
    text-align: center;
  }
}

.banner__content {
  color: #333;
  
}

.banner__title {
  font-size: 28px;

  font-weight: 600;
  display: block;
}

</style>

