<template>
  <div>
    <div class="banner">
      <div class="banner__content">
        <h1>{{survey.title}}</h1>
        <p>{{survey.desc}}</p>
        <button-primary label="Subscribe"></button-primary>
      </div>
    </div>
  
    <div class="content">
  

      <button-primary v-if="survey.owner && survey.owner.uid === user.uid" 
        label="Edit Project" v-on:action="editProject"></button-primary>
     
        <p v-if="survey.ownerh">Idea by {{survey.owner.displayName}}</p>
      <article class="story">


        <div v-if="survey.writeup" v-html="survey.writeup.content"></div>
      

        
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
  mounted: function(){

    var _this = this;
    // console.log(_this.$route.path)

    var surveyDB = firebase.database().ref(this.$route.params.id);

   
    surveyDB.once('value', function(snapshot) {
      _this.survey = snapshot.val();

      console.log(_this.survey);

      
    });


    

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

