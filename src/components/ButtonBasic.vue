<template>
	<button 
		class="button" 
		:class="modifiers"
		:disabled="disabled" 
		v-on:click="clickHandler">{{label}}</button>
</template>

<script>
	export default {
		name: "button-basic",
		props: {
			label: "",
			disabled: false,
			modifiers: ''
		},
		methods: {
			clickHandler: function(){
			  this.$emit("action");
			}
		}
		
		
	}

</script>

<style lang="scss" scoped>

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
	display: inline-block;
	cursor: pointer;
	font-weight: 600;
}

.button--primary {
  background-color: #69C263;
  padding: 8px 16px;
  color: white;
  border-radius: 3px;
  transition: background-color 0.3s ease;
	&:hover {
		background-color: #73d275;
	}
}

.button--text {
	color: #69C263;
	font-weight: 600;
	font-size: 0.9em;
}



.button--primary[disabled], .button--primary.is--loading {
	background-color: #DFF0DA;
}

</style>