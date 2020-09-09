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
		},
		numberOfBoroughs: function(){
			return _.size(this.boroughs);
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

				const rectWidth = p.width/vm.numberOfBoroughs;
				let i = 0;

				p.push();
				p.translate(0, p.height);
				p.rectMode(p.CORNERS);

				_.each(vm.boroughs, (area_name, area_code) => {
					p.fill(255);

					const rectHeight = p.map(
						vm.byArea[area_code]["2020-06-06"].totalCases,
						0, 2000,
						0, p.height
					);
					p.rect(rectWidth * i, 0, rectWidth * (i + 1), -rectHeight);

					i++;
				});

				p.pop();
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