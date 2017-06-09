<template>
	<button 
		class="button button--primary" 
		:disabled="disabled" 
		v-on:click="clickHandler">{{label}}</button>
</template>

<script>
	export default {
		name: "button-primary",
		props: {
			label: "",
			disabled: false
		},
		methods: {
			clickHandler: function(){
			  this.$emit("action");
			}
		}
		
		
	}

</script>

<style scoped>

/* Reset `button` and button-style `input` default styles */
input[type="submit"],
input[type="reset"],
input[type="button"],
button {
    background: none;
    border: 0;
    color: inherit;
    /* cursor: default; */
    font: inherit;
    line-height: normal;
    overflow: visible;
    padding: 0;
    -webkit-appearance: button; /* for input */
    -webkit-user-select: none; /* for button */
       -moz-user-select: none;
        -ms-user-select: none;
}
input::-moz-focus-inner,
button::-moz-focus-inner {
    border: 0;
    padding: 0;
}

.button {
  background-color: #69C263;
  padding: 10px 16px;
  color: white;
  font-weight: 600;
  border-radius: 3px;
  display: inline-block;
  cursor: pointer;
  transition: background-color 0.3s ease;

}

.button:hover {
	background-color: #73d275;
}

.button[disabled], .button.is--loading {
	background-color: #DFF0DA;
}

</style>