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
			drawBarGraph(p, vm);
		};

		function drawBarGraph(p, vm){
			const rectWidth = p.width/vm.numberOfBoroughs;

			p.push();
			p.translate(0, p.height);
			p.rectMode(p.CORNERS);

			let i = 0;
			_.each(vm.boroughs, (area_name, area_code) => {
				if(area_code === vm.$store.state.currentArea){
					p.fill(255, 0, 0);
				}else{
					p.fill(255);
				}

				let currentDate = moment(vm.minDate).add(vm.$store.getters.wholeCurrentDay, "days").format("YYYY-MM-DD");
				let totalCases = vm.byArea[area_code][currentDate].totalCases;

				const rectHeight = p.map(
					totalCases,
					0, vm.maxTotalCases,
					0, p.height
				);
				p.rect(rectWidth * i, 0, rectWidth * (i + 1), -rectHeight);

				p.fill(200);
				let newCases = vm.byArea[area_code][currentDate].newCases;
				const rectHeight2 = p.map(
					newCases,
					0, vm.maxTotalCases,
					0, p.height
				);
				p.rect(rectWidth * i, -rectHeight, rectWidth * (i + 1), -rectHeight+rectHeight2);

				i++;
			});

			p.pop();
		}
	};

	return sketch;
}