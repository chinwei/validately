<template>
  <div class="container">

    <div class="banner banner--main">
      Help grow ideas
    </div>

    <div class="content">

      <article>


        <div class="list__header">
          <h1>Projects You Like</h1>
        </div>

   
        
        <div v-if="owners">
          <project-list-item 
            v-for="key, value in owners.likes"
            v-bind:item="projectObj[value]"
            v-on:action="goToProject('projects/'+projectObj[value].url)"/>
        </div>



        <div class="list__header">
          <h1>Recent Projects</h1>
          <button-primary v-if="user.uid"
            label="New Project" 
            v-on:action="goToProject('/projects/new')"/>
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
  created: function(){

    var _this = this;


   var projectRef = firebase.database().ref('projects/');

    projectRef
      .orderByChild('time')
      .limitToLast(5)
      .on("child_added", function(snapshot){

      // console.log(snapshot.key)
      _this.projects.push(snapshot.val())
      _this.projectObj[snapshot.key] = snapshot.val()


    });

    

    


  },
  mounted: function(){
    // console.log(this.owners)


    var _this = this;
    var likedProjectRef = firebase.database().ref('projects/')
      .orderByChild('time')
      .limitToLast(5)
      .on("value", function(snapshot){

      // console.log("getting BJoURlSZZ:",snapshot.val());
      // _this.projects.push(snapshot.val())
      _this.projectObj = snapshot.val()

      // console.log("projectObj: ",_this.projectObj);


    });;


  },
  components: {
    ProjectListItem,
    ButtonPrimary
  },
  props:{
    user: ""
  },
  methods:{
    goToProject: function(path){
      this.$router.push({ path: path })
    },
    clickHandler: function() {
      this.$router.push({ path: path })
    }
  },
  computed: {
    listArray: function(){
      var list = _.map(this.projects, function(num, key){ 
        return num
      });
      // console.log(_.sortBy(list.time));

     
      var sortByDate = _.sortBy(list, function(num, key){
        // console.log(Date.parse(num.time))
        return sortByDate;
      })

      // console.log(sortByDate);
      
      return sortByDate.reverse();
    },
    owners: function() {


      // console.log(this.listArray);
      var _this = this;
      var owners = {}

      

        // console.log(num, key)
        var owner = firebase.database()
          .ref('users/'+_this.user.uid)
          .on("value", function(snapshot){

            // console.log(snapshot.val());

            owners = snapshot.val()
            // owners[num.owner.uid] = snapshot.val()
        });
      

      // console.log(owners.displayName)
      // owner[key.owner].displayName



      return owners;
    }
  },
  data () {
    return {
      projects: [],
      projectObj: {}
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

