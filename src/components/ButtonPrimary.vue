<template>
	<div class="button button--primary" v-on:click="clickHandler">{{label}}</div>
</template>

<script>
	export default {
		name: "button-primary",
		props: {
			label: ""
		},
		methods: {
			clickHandler: function(){
			  this.$emit("action");
			}
		}
		
		
	}

</script>

<style scoped>
.button {
  background: #69C263;
  padding: 10px 16px;
  color: white;
  font-weight: 600;
  border-radius: 3px;
  display: inline-block;
  cursor: pointer;

}

.button:hover {
	background: #73d275;
}
</style>