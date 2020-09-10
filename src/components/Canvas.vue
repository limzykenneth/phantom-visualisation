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

					let currentDate;
					let totalCases;
					currentDate = moment(vm.minDate).add(vm.$store.state.currentDay, "days").format("YYYY-MM-DD");
					totalCases = vm.byArea[area_code][currentDate].totalCases;

					const rectHeight = p.map(
						totalCases,
						0, vm.maxTotalCases,
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
	position: absolute;
	left: 0;
	top: 0;
}
</style>