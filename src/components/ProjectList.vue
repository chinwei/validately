<template>
  <div class="content-container">
    <login-overlay v-on:hideOverlay="hideOverlay" v-bind:isVisible="isVisible"></login-overlay>
    <div class="banner banner--secondary">
      <div class="banner__content">
        <div class="banner__title">Start something people love</div>
        <button-basic
          label="Start a Project"
          modifiers="button--primary"
          v-on:action="goToNewProject"/>
      </div>
    </div>
    <div class="content">

      <article> 
        <div v-if="currentUserProjectObj != undefined" class="list">
          <div class="list__header">
            <h1>Projects You Created</h1>
          </div>

          
          
          <project-list-item 
            v-for="key, value in currentUserProjectObj"
            :key="key"
            v-bind:item="key"
            v-on:action="goToProject('/projects/'+key.url)"/>
        </div>


        <div v-if="currentUserTargetObj.likes != undefined" class="list">
          <div class="list__header">
            <h1>Projects You Liked</h1>
          </div>


          <project-list-item 
            v-for="key, value in currentUserTargetObj.likes"
            :key="key"
            v-bind:item="projectObj[value]"
            v-on:action="goToProject('/projects/'+projectObj[value].url)"/>
          
        </div>


        <div v-if="listArray.length > 0" class="list">
          <div class="list__header">
            <h1>Recent Projects</h1>
          </div>

          <project-list-item 
            v-for="key, value in listArray" 
            :key="key"
            v-bind:item="key"
            v-on:action="goToProject('projects/'+key.url)"/>
        </div>
  
      </article>
      
    </div>

    </div>
</template>

<script>

import firebase from 'firebase'
import _ from 'underscore'
import ProjectListItem from '@/components/ProjectListItem'
import ButtonBasic from '@/components/ButtonBasic'
import LoginOverlay from '@/components/LoginOverlay'


export default {
  name: 'project-list',
  created() {
    // console.log(this.user)

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
    ButtonBasic,
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
.banner--secondary .banner__content {
  text-align: center;
}



</style>

