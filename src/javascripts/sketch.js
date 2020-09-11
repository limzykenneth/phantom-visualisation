import drawBarGraph from "./barGraph.js";
import {initCirclesMap, drawCirclesMap, mouseMovedCirclesMap} from "./circlesMap.js";
import {initCirclesConcentric, drawCirclesConcentric} from "./circlesConcentric.js";

export default function(vm){
	let sketch = function(p){
		let canvas;
		const playbackLength = 30000;
		let globalTranslate = {
			x: 0,
			y: 0
		};

		p.setup = function(){
			canvas = p.createCanvas(p.windowWidth, p.windowHeight);
			p.background(0);
			canvas.parent(vm.$el);
			p.fill("#fff");
			p.noStroke();

			initCirclesMap(p, vm);
			// initCirclesConcentric(p, vm);
		};

		p.draw = function(){
			p.background(0);

			// Update data or state
			const incrementAmt = p.deltaTime / playbackLength * vm.numberOfDays;
			if(vm.$store.state.playState === "play"){
				vm.$store.commit("incrementCurrentDay", incrementAmt);

				if(vm.$store.state.currentDay >= 128){
					vm.$store.commit("setPlayState", "pause");
				}
			}

			// Draw graphics
			if(p.mouseIsPressed){
				globalTranslate.x += p.mouseX - p.pmouseX;
				globalTranslate.y += p.mouseY - p.pmouseY;
			}

			globalTranslate.x = Math.min(Math.max(globalTranslate.x, -150), 150);
			globalTranslate.y = Math.min(Math.max(globalTranslate.y, -150), 150);
			p.translate(globalTranslate.x, globalTranslate.y);
			// drawBarGraph(p, vm);
			drawCirclesMap(p, vm);
			// drawCirclesConcentric(p, vm);
		};

		p.mouseMoved = function(){
			mouseMovedCirclesMap(globalTranslate, p, vm);
		};
	};

	return sketch;
}