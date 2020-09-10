import drawBarGraph from "./barGraph.js";
import {initCirclesMap, drawCirclesMap} from "./circlesMap.js";

export default function(vm){
	let sketch = function(p){
		let canvas;
		const playbackLength = 10000;

		p.setup = function(){
			canvas = p.createCanvas(p.windowWidth, p.windowHeight);
			p.background(0);
			canvas.parent(vm.$el);
			p.fill("#fff");
			p.noStroke();

			initCirclesMap(p, vm);
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
			// drawBarGraph(p, vm);
			drawCirclesMap(p, vm);
		};
	};

	return sketch;
}