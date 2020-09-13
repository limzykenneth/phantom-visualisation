import {initCirclesMap, drawCirclesMap, mouseMovedCirclesMap} from "./visualisations/circlesMap.js";

export default function(vm){
	let sketch = function(p){
		let canvas;
		let globalTranslate = {
			x: 0,
			y: 0
		};
		let pMouse = {
			x: null,
			y: null
		};
		const playbackLength = 30000;

		p.setup = function(){
			canvas = p.createCanvas(p.windowWidth, p.windowHeight);
			p.background(0);
			canvas.parent(vm.$el);
			p.fill("#fff");
			p.noStroke();

			// Initialize visualisation
			initCirclesMap(p, vm);

			// Mouse events for moving graphics
			canvas.mouseMoved(() => {
				if(p.mouseIsPressed){
					// Work out move amount by comparing current mouse position
					// with previous mouse position
					if(pMouse.x !== null){
						globalTranslate.x += p.mouseX - pMouse.x;
					}
					if(pMouse.y !== null){
						globalTranslate.y += p.mouseY - pMouse.y;
					}

					// Constrain movement
					globalTranslate.x = Math.min(
						Math.max(globalTranslate.x, -150),
						150
					);
					globalTranslate.y = Math.min(
						Math.max(globalTranslate.y, -150),
						150
					);

					// Record mouse position
					pMouse.x = p.mouseX;
					pMouse.y = p.mouseY;
				}
			});

			canvas.mouseReleased(() => {
				pMouse = {
					x: null,
					y: null
				};
			});

			canvas.mouseClicked(() => {
				if(p.windowWidth > 600){
					mouseMovedCirclesMap(globalTranslate, p, vm);
				}
			});
		};

		p.draw = function(){
			p.background(0);

			// Update data or state
			const incrementAmt = p.deltaTime / playbackLength * vm.numberOfDays;
			if(vm.$store.state.playState === "play"){
				// Start playback
				vm.$store.commit("incrementCurrentDay", incrementAmt);

				if(vm.$store.state.currentDay >= 128){
					// Stop playback if end is reached
					vm.$store.commit("setPlayState", "pause");
				}
			}

			// Apply graphics movement
			p.translate(globalTranslate.x, globalTranslate.y);

			// Draw visualisation
			drawCirclesMap(p, vm);
		};

		p.windowResized = function(){
			p.resizeCanvas(p.windowWidth, p.windowHeight);
		};
	};

	return sketch;
}