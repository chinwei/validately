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
     
        <p v-if="survey.owner">Idea by {{survey.owner.displayName}}</p>
      <article class="story">


        <div v-if="survey.writeup" v-html="survey.writeup.content"></div>
      
        <button-primary 
        label="Load Comments" v-on:action="loadComments"></button-primary>


        <div id="disqus_thread"></div>
        
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
  created: function(){

    var _this = this;
    // console.log(_this.$route.path)

    var surveyDB = firebase.database().ref(this.$route.params.id);

   
    surveyDB.once('value', function(snapshot) {
      _this.survey = snapshot.val();

      console.log(_this.$route.params.id);

    });

      /**
    *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
    *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
    

    // (function() { // DON'T EDIT BELOW THIS LINE
    // var d = document, s = d.createElement('script');
    // s.src = 'https://magnetize-1.disqus.com/embed.js';
    // s.setAttribute('data-timestamp', +new Date());
    // (d.head || d.body).appendChild(s);
    // })();

     var disqus_shortname = "magnetize-1";

     $.ajax({
            type: "GET",
            url: "http://" + disqus_shortname + ".disqus.com/embed.js",
            dataType: "script",
            cache: true,
            success : onSuccess
    });
     
    function onSuccess() {
      DISQUS.reset({
        reload: true,
        config: function () {  

          console.log('identifier:', this.page.identifier);
          console.log('url:', this.page.url);
          this.page.identifier = window.location.hash.replace("/projects/", "");
          this.page.url = window.location.href.replace(window.location.host+'/#', window.location.host+'/#!');
        }
      }); 
      
    }

    
    


    



  },
  mounted: function(){
    // console.log(DISQUS)
    
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
    },
    loadComments: function(){


      //  var disqus_shortname = "magnetize-1";

      //  $.ajax({
      //         type: "GET",
      //         url: "http://" + disqus_shortname + ".disqus.com/embed.js",
      //         dataType: "script",
      //         cache: true,
      //         success : onSuccess
      // });
       
      // function onSuccess() {
      //   DISQUS.reset({
      //     reload: true,
      //     config: function () {  

      //       console.log('identifier:', this.page.identifier);
      //       console.log('url:', this.page.url);
      //       this.page.identifier = window.location.hash.replace("/projects/", "");
      //       this.page.url = window.location.href.replace(window.location.host+'/#', window.location.host+'/#!');
      //     }
      //   }); 
        
      // }

    
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

