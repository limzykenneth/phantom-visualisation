<template>
	<div id="canvas-container"></div>
</template>

<script>
import sketch from "../javascripts/sketch.js";

let p5Sketch;

export default{
	name: "AppCanvas",
	props: {
		boroughs: {
			type: Object,
			required: true
		},
		byDate: {
			type: Object,
			required: true
		},
		byArea: {
			type: Object,
			required: true
		},
		covid: {
			type: Array,
			required: true
		},
		minDate: {
			type: Object,
			required: true
		},
		maxDate: {
			type: Object,
			required: true
		},
		numberOfDays: {
			type: Number,
			required: true
		},
		numberOfBoroughs: {
			type: Number,
			required: true
		}
	},
	computed: {
		maxTotalCases: function(){
			return _.reduce(this.covid, (acc, entry) => {
				if(acc < parseInt(entry.total_cases)){
					acc = parseInt(entry.total_cases);
				}

				return acc;
			}, 0);
		},
		maxNewCases: function(){
			return _.reduce(this.covid, (acc, entry) => {
				if(acc < parseInt(entry.new_cases)){
					acc = parseInt(entry.new_cases);
				}

				return acc;
			}, 0);
		}
	},
	mounted: function(){
		p5Sketch = new p5(sketch(this));
	},
	beforeDestroy: function(){
		p5Sketch.remove();
	}
};
</script>

<style lang="less" scoped>
#canvas-container{
	position: absolute;
	left: 0;
	top: 0;
	z-index: -5;
}
</style>