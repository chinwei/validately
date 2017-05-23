<template>
  <div class="container">

    <div class="banner banner--main">
      Help grow ideas
    </div>

    <div class="content">

      <article>

        <button-primary v-if="user.uid"
          label="New Project" 
          v-on:action="goToProject('/projects/new')"/>
          

        <div class="list__header">
          <h1>Recent Projects</h1>
        </div>

        <project-list-item 
          v-for="key, value in listArray" 
          v-bind:item="key"
          v-on:action="goToProject('projects/'+key.url)"/>

       <!--    
        <button-primary 
          label="Show 5 more - doesn't work yet" 
          /> -->
      
        
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


   
    var surveyDB = firebase.database().ref().orderByChild('time').limitToLast(5).on("child_added", function(snapshot){
      _this.survey.push(snapshot.val())

      // console.log("route:",_this.$route.params.id);
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
      var list = _.map(this.survey, function(num, key){ 
        return num
      });
      // console.log(_.sortBy(list.time));

     
      var sortByDate = _.sortBy(list, function(num, key){
        // console.log(Date.parse(num.time))
        return Date.parse(num.time)
      })

      
      return sortByDate.reverse()
    }
  },
  data () {
    return {
      survey: [],
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
}


.banner {
  padding: 60px; 
  display: flex;
  align-items: center;
}

.banner--main {
  background: #4990E2;
  color: white;
  justify-content: center;
  font-size: 28px;
}

</style>

