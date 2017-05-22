<template>
   <div v-on:click="clickHandler">
      <h1>{{item.title}}</h1>
      <span class="byline">{{item.desc}}</span>
      <!-- <span>{{item.time}}</span> -->
      
   </div>

</template>

<script>


export default {
  name: 'project-list-item',
  methods:{
    clickHandler: function(){
      this.$emit("action");
    }
  },
  computed: {},
  props:{
    item: {}
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

  .byline {
    font-size: 14px;
    color: hsla(0, 0%, 27%, 0.74);
  }

  div {
    padding: 16px;
    border-bottom: 1px #f3f3f3 solid;
    background: white;
    cursor: pointer;
  }

  div:hover {
    background: #f3f3f3;
  }


</style>