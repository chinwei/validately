<template>
  <div class="app-container">
      <article class="story-block">
        <div class="story__header">
          <h1>Project List</h1>
        </div>


        <project-list-item 
          v-for="key, value in listArray" 
          v-bind:item="key"
          v-on:goToProject="goToProject(key.url)"
          ></project-list-item>




        <router-link tag="button" to="/projects/new">New Project</router-link>
          

      
        
      </article>
    </div>
</template>

<script>

import firebase from 'firebase'
import _ from 'underscore'
import ProjectListItem from '@/components/ProjectListItem'

export default {
  name: 'project-list',
  mounted: function(){

    var _this = this;
   
    var surveyDB = firebase.database().ref(this.$route.params.id);
   
    surveyDB.on('value', function(snapshot) {
      _this.survey = snapshot.val();
    });
  },
  components: {
    ProjectListItem
  },
  methods:{
    goToProject: function(path){
      this.$router.push({ path: path })
    }
  },
  computed: {
    listArray: function(){
      var list = _.map(this.survey, function(num, key){ 
        return num
      });

      return list;
    }
  },
  data () {
    return {
      survey: {}
    }
  }
}
</script>

<style>

.app-container {
  width: 600px;
  margin: 0 auto;
  text-align: left;

}

</style>

