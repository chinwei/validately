<template>
   <div class="list-item" v-if="item" v-on:click="clickHandler">
      <h1>{{item.title}} <span class="name">{{item.owner.displayName}}</span></h1>
      <span class="byline">{{item.desc}}</span>
      
      <div style="margin-top: 8px">
        <svg class="like-icon" viewBox="0 0 100 100" width="16" height="16">
          <use xlink:href="./static/assets/sprites.svg#heart"></use>
        </svg>

        <span class="liked-count">{{likedCount}}</span>

      </div>

   </div>

</template>

<script>
import _ from 'underscore'

export default {
  name: 'project-list-item',
  methods:{
    clickHandler: function(){
      this.$emit("action");
    }
  },
  props:{
    item: {},
    owner: {}
  },
  computed: {
    likedCount: function(){

      // console.log(this.item)
      if (this.item) {
      var likedCount = _.keys(this.item.liked).length;

      return likedCount;
    }
    }
  },
  data () {
    return {
      survey: {}
    }
  }
}
</script>

<style scoped>


 


  h1 {
    font-size: 20px;
    margin: 0;
  }

  .liked-count {
    color: #aaa;
    font-weight: 600;
    font-size: 12px;
  }

  .like-icon {
    fill: #ccc;
    stroke: none;
  }

  .name {
    font-size: 12px;
    font-weight: 400;
    color: #777;
  }
  .byline {
    font-size: 14px;
    color: hsla(0, 0%, 27%, 0.74);
  }

  div.list-item {
    padding: 16px;
    border-bottom: 1px #f3f3f3 solid;
    background: white;
    cursor: pointer;
  }

  div:hover {
    background: #f3f3f3;
  }


</style>