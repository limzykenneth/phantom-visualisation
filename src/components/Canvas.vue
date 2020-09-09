<template>
	<div id="canvas-container"></div>
</template>

<script>
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
		}
	},
	computed: {
		minDate: function(){
			return _.reduce(this.covid, (val, entry) => {
				const date = moment(entry.date, "YYYY-MM-DD");
				if(date.isBefore(val)){
					val = date;
				}

				return val;
			}, moment("2020-12-31", "YYYY-MM-DD"));
		},
		maxDate: function(){
			return _.reduce(this.covid, (val, entry) => {
				const date = moment(entry.date, "YYYY-MM-DD");
				if(date.isAfter(val)){
					val = date;
				}

				return val;
			}, moment("2020-01-01", "YYYY-MM-DD"));
		},
		numberOfDays: function(){
			return this.maxDate.diff(this.minDate, "days");
		}
	},
	mounted: function(){
		const vm = this;

		let sketch = function(p){
			let canvas;

			p.setup = function(){
				canvas = p.createCanvas(p.windowWidth, p.windowHeight);
				p.background(0);
				canvas.parent(vm.$el);
				p.fill("#fff");
				p.noStroke();
			};

			p.draw = function(){
				p.background(0);

				p.text(vm.numberOfDays, p.width/2, p.height/2);
			};
		};

		new p5(sketch);
	}
};
</script>

<style lang="less" scoped>
#canvas-container{

}
</style>