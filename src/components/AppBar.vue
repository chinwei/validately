<template>
  <div class="app-bar">
    <div class="app-bar__content">
      <span class="app-bar__project-row">
        <svg v-on:click="goBack" class="logo-icon link u-spacing-mr-l" width="150" height="50">
          <use xlink:href="/static/assets/sprites.svg#logo"></use>
        </svg>
        <a href="#" v-on:click.prevent="goToNewProject" class="u-spacing-mr-l">Start a Project</a>
      </span>

      <div class="menu-container">

        <button-basic v-if="!user.uid" 
          label="Login with Facebook" 
          modifiers="button--primary"
          v-bind:class="{'is--loading': isLoading}" 
          v-on:action="handleLogin"></button-basic>

        <div v-bind:class="{'is--expanded': isExpanded}" class="dropdown" >
          <div v-on:click="isExpanded = !isExpanded" v-if="user.uid">{{user.displayName}}</div>
          <div class="dropdown-target">
            <ul>
              <li><a href="#" v-on:click.prevent="handleLogout">Log Out</a></li>
            </ul>
          </div>
        </div>

       

      </div>
      
    </div>
  </div>
</template>


<script>

import firebase from 'firebase'
import firebaseui from 'firebaseui'
import ButtonBasic from '@/components/ButtonBasic'
import { login, logout} from '../../utils/auth'

export default {
  name: 'app-bar',
  methods: {
    handleLogin(){
      var _this = this;
      this.isLoading = true;
      login(function(){
        _this.isLoading = false;
      })
    },
    handleLogout(){
      logout()
      this.isExpanded = false;
    },
    goToNewProject(){
      
      console.log('any users? ',this.user.uid)

      console.log(this.user.uid !== undefined)
      if (this.user.uid !== undefined) {
        this.goTo('/projects/new');
      } else {
        this.$emit("showOverlay");
      }
    },

    goBack: function(){
      this.$router.replace("/");
    },
    goTo: function(path){
      this.$router.push({ path: path })
    },
    toggleDropdown(){
      this.isdropdownVisible = !this.isdropdownVisible;
    },
  },
  components: {
    ButtonBasic
  },
  props: {
    user: {}
  },
  data () {
    return {
      isLoggedIn: false,
      isLoading: false,
      isExpanded: false,
      isVisible: false
    }
  }
}
</script>

<style lang="scss">

.logo-icon {
  cursor: pointer;
}



  .app-bar {
    width: 100%;
  }

  .app-bar__content {
    height: 60px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 3vw 0 1vw;
    background: white;
    border-bottom: 1px #f3f3f3 solid;
  }

  .menu-container {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .dropdown {
    height: 100%;
    padding: 0 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;

    &.is--expanded .dropdown-target {
      opacity: 1;
      top: 50px;
      
    }
  }



  .dropdown-target {
    position: absolute;
    padding: 8px;
    left: 0;
    background: white;
    border: 1px #f3f3f3 solid;
    border-radius: 5px;
    box-shadow: #F3F3F3 0px 3px 4px;
    width: 100%;
    opacity: 0;
    top: 55px;
    transition: top 0.3s ease, opacity 0.3s ease;
  }



  .u-spacing-mr-m {
    margin-right: 8px 
  }

  .u-spacing-mr-l {
    margin-right: 32px 
  }

  .app-bar__project-row {
    display: flex;
    align-items: center;

    a {
      font-weight: 500;
      font-size: 18px;
    }

  }

  .profile-image {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }



</style>