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
      <!-- <p v-if="survey.owner && survey.owner.uid === user.uid">Same!!!</p> -->

      <article class="story">

      <!-- <p>I was gifted a Rider Waite deck when I started to get interested in the tarot. I've been using it for the past 6 years and found that:</p>

      <ol>
        <li>I did not relate fully relate to the art </li>
        <li>...Or the way the descriptions were written</li>
        <li>...Which inspired me to create my own tarot deck</li>
      </ol>

      <p>Mystic Mondays was created out of a desire to understand the tarot better as well as explore the meanings behind each cards through illustration & writing.</p>

      <p>Since the Mystic Mondays deck is based on the Rider Waite, it maintains the integrity of the meanings, while keeping the illustrations simple to get to the heart of the matter.</p> -->


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

