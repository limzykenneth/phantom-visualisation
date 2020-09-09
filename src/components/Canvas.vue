<template>
	<div id="canvas-container"></div>
</template>

<script>
export default{
	name: "AppCanvas",
	mounted: function(){
		let container = this.$el;
		let sketch = function(p){
			let canvas;

			p.setup = function(){
				canvas = p.createCanvas(p.windowWidth, p.windowHeight);
				p.background(0);
				canvas.parent(container);
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