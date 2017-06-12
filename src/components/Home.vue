<template>
  <div class="content-container">
    <login-overlay v-on:hideOverlay="hideOverlay" v-bind:isVisible="isVisible"></login-overlay>
      <div class="banner banner--main">
        <div class="banner__content">
          <div class="banner__title">Build better ideas with real stories</div>
          <p class="banner__writeup">Empower your ideas with meaningful feedback</p>
          <button-basic
            label="Start a Project"
            modifiers="button--primary"
            v-on:action="goToNewProject"/>
        </div>
      </div>
    </div>
</template>

<script>
import ButtonBasic from '@/components/ButtonBasic'
import LoginOverlay from '@/components/LoginOverlay'


export default {
  name: 'home',
  components: {
    ButtonBasic,
    LoginOverlay
  },
  props:{
    user: {}
  },
  methods:{
    goToProject: function(path){
      this.$router.push({ path: path })  
    },
    goToNewProject(){
      if (this.user.uid) {
        this.goToProject('/projects/new');
      } else {
        this.isVisible = true
      }
    },
    clickHandler() {
      this.$router.push({ path: path })
    },
    hideOverlay(){
      this.isVisible = false
    }
  },
  data () {
    return {
      isVisible: false
    }
  }
}
</script>

<style lang="scss">




</style>

