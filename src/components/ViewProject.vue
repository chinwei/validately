<template>
  <div class="app-container">
      <article class="story-block">
        <div class="story__header">
          <h1>{{survey.title}}</h1>
          <a v-on:click="goBack">Back</a>
        </div>

      
        <div v-if="survey.writeup" v-html="survey.writeup.content">
      

        </div>
      </article>
    </div>
</template>

<script>

import firebase from 'firebase'
import $ from 'jquery'

export default {
  name: 'edit-project',
  mounted: function(){

    var _this = this;
   

    var surveyDB = firebase.database().ref(this.$route.params.id);

   
    surveyDB.once('value', function(snapshot) {
      _this.survey = snapshot.val();

      console.log(_this.survey);

      
    });




  },
  methods: {
    goBack: function(){
        this.$router.replace("/projects/")
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

