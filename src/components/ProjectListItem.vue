<template>
   <div v-on:click="clickHandler">
      <h1>{{item.title}} <span class="name">{{item.owner.displayName}}</span></h1>
      <span class="byline">{{item.desc}}</span>
      
      
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


  .name {
    font-size: 12px;
    font-weight: 600;
    color: #777;
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