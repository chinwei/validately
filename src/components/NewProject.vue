<!-- <template>
  <div class="app-container" id="edit">
      <button-primary label="submit" v-on:action="handleSubmit"></button-primary>
      <div>
      <input class="input--title" placeholder="Title your Project..." type="text" v-model="survey.title"/>
      
      <textarea class="input__long-text" v-model="survey.desc" placeholder="Briefly describe your idea!" type="text"/>


      <div id="editor">
      </div>
      </div>
    </div>
</template>

<script>

import firebase from 'firebase'
import Quill from 'quill'
import $ from 'jquery'
import ButtonPrimary from '@/Components/ButtonPrimary'

export default {
  name: 'new-project',
  mounted: function(){

    if (this.user.uid === undefined) {
      this.$router.replace("/")
    }

    var _this = this;
    
    _this.quill = new Quill('#editor', {
       modules: {
           toolbar: [
              [{ header: [1, 2, false] }],
              ['bold', 'italic', 'underline'],
              ['image', 'code-block']
            ]
       },
       placeholder: 'Compose an epic...',
       theme: 'snow'
     });
  },
  props: {
    user: {}
  },
  components: {
    ButtonPrimary
  },
  methods: {


    handleSubmit: function(e){
      var _this = this;

      var timestamp = new Date()
      var ref = 'ideas/'+this.survey.title.replace(/[^\w\s]/gi, '').replace(/\s/g,'-').toLowerCase()

      firebase.database()
      .ref('ideas/'+this.survey.title.replace(/[^\w\s]/gi, '').replace(/\s/g,'-').toLowerCase()).set({
       url: _this.path,
       title: _this.survey.title,
       desc: _this.survey.desc,
       time: timestamp.toString(),
       owner: {
        displayName: _this.user.displayName,
        email: _this.user.email,
        uid: _this.user.uid
       },
       writeup: {
          content: $("#editor .ql-editor").html(),
          contentDelta: _this.quill.getContents()
       }
       
      });

      _this.$router.push({ path: _this.path })


    }
  },
  computed: {
    path: function(){
      return this.survey.title.replace(/\s/g,'-').toLowerCase();
    }, 
  },
  data () {
    return {
      survey: {
        title: "",
        desc: "",
        writeup: {
           content: "",
           contentDelta: {}
        },
        
      }
    }
  }
}
</script>

<style>




  
 
</style>

 -->