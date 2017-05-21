<template>
  <div class="hello">
    
    <h2>What is the name of your project?</h2>
    <input type="text" placeholder="Project Name" v-model="location" />
    
    <router-link tag="button" v-bind:to="route">{{location}}</router-link>

  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'name-project',
  created: function(){

    var surveyDB = firebase.database().ref('survey/');
    surveyDB.once('value', function(snapshot) {
      // console.log(snapshot.val());
    })


  },
  data () {
    return {
      location: 'Project 1'
    }
  },
  computed: {
    route: function(){
      
      return this.location.replace(/\s/g,'').toLowerCase();
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
