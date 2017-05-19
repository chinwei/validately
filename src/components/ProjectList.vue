<template>
  <div>
    

    <div class="banner">
      Banner
    </div>

    <div class="content">
      <article class="story-block">
        <div class="story__header">
          <h1>Recent Projects</h1>
        </div>


        <project-list-item 
          v-for="key, value in listArray" 
          v-bind:item="key"
          v-on:goToProject="goToProject(key.url)"
          ></project-list-item>




        <router-link tag="button" to="/projects/new">New Project</router-link>
          

      
        
      </article>
      
    </div>

    </div>
</template>

<script>

import firebase from 'firebase'
import _ from 'underscore'
import ProjectListItem from '@/components/ProjectListItem'


export default {
  name: 'project-list',
  created: function(){

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

.content {
  width: 600px;
  margin: 0 auto;
  text-align: left;
}

.app-bar {
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 8px;
  background: white;
  border-bottom: 1px #f3f3f3 solid;
}

.banner {
  background: #4990E2;
  color: white;
  font-size: 28px;
  height: 300px; 
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>

