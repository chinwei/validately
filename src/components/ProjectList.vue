<template>
  <div class="container">

    <div class="banner banner--main">
      Help grow ideas
    </div>

    <div class="content">

      <article> 


        
        <div v-if="user.uid" class="list__header">
          <h1>Projects You Created</h1>
          <button-primary v-if="user.uid"
            label="New Project"
            v-on:action="goToProject('/projects/new')"/>
        </div>

        <project-list-item 
          v-for="key, value in currentUserProjectObj"
          v-bind:item="key"
          v-on:action="goToProject('projects/'+key.url)"/>


        <div v-if="user.uid" style="margin-top: 32px" class="list__header">
          <h1>Projects You Like</h1>
        </div>

     

        <project-list-item 
          v-for="key, value in currentUserTargetObj.likes"
          v-bind:item="projectObj[value]"
          v-on:action="goToProject('projects/'+projectObj[value].url)"/>


        <div class="list__header" style="margin-top: 32px">
          <h1>Recent Projects</h1>
         
        </div>

        

        <project-list-item 
          v-for="key, value in listArray" 
          v-bind:item="key"
          v-on:action="goToProject('projects/'+key.url)"/>



       

        
      </article>
      
    </div>

    </div>
</template>

<script>

import firebase from 'firebase'
import _ from 'underscore'
import ProjectListItem from '@/components/ProjectListItem'
import ButtonPrimary from '@/components/ButtonPrimary'


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
    ButtonPrimary
  },
  props:{
    user: {}
  },
  methods:{
    goToProject: function(path){
      this.$router.push({ path: path })
    },
    clickHandler: function() {
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
      currentUserTargetObj: {}
    }
  }
}
</script>

<style>

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
  padding: 60px; 
  display: flex;
  align-items: center;
}

.banner--main {
  background: url('/static/assets/header-bg.jpg') center center;
  background-size: cover;
  color: white;
  padding: 5em;
  justify-content: center;
  font-size: 28px;
}

</style>

