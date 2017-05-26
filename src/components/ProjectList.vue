<template>
  <div class="container">

    <div class="banner banner--main">
      Help grow ideas
    </div>

    <div class="content">

      <article>

        
          

        <div class="list__header">
          <h1>Recent Projects</h1>
          <button-primary v-if="user.uid"
            label="New Project" 
            v-on:action="goToProject('/projects/new')"/>
        </div>

        <!-- {{listArray}} -->
<!-- 
        <ul>
          <li v-for="key, value in listArray">
            {{owners[key.owner].displayName}}
          </li>
        </ul>
 -->

        <project-list-item 
          v-if="owners[key.owner]"
          v-for="key, value in listArray" 
          v-bind:item="key"
          v-bind:owner="owners[key.owner]"
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


   
    var projects = firebase.database()
      .ref('projects/')
      .orderByChild('time')
      .limitToLast(5)
      .on("child_added", function(snapshot){

      _this.projects.push(snapshot.val())

    });

    


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
        return Date.parse(num.time)
      })

      // console.log(sortByDate);
      
      return sortByDate.reverse();
    },
    owners: function() {


      // console.log(this.listArray);
      var _this = this;
      var owners = {}

      _.each(this.listArray, function(num, key){
        // console.log(num.owner, key)

        var owner = firebase.database()
          .ref('users/'+num.owner)
          .on("value", function(snapshot){

            owners[num.owner] = snapshot.val()
        });
      })

      // console.log(owners)
      // owner[key.owner].displayName



      return owners;
    }
  },
  data () {
    return {
      projects: []
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

