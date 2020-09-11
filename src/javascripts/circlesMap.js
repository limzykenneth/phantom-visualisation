import {borders} from "./boroughConnections.js";

let boroughs = [];

export function initCirclesMap(p, vm){
	boroughs = _.map(vm.boroughs, (area_name, area_code) => {
		return new Borough(area_name, area_code, vm.byArea[area_code], p, vm);
	});

	// Establish connections between boroughs
	boroughs.forEach((borough) => {
		borders[borough.code].forEach((targetCode) => {
			borough.linkBorough(_.find(boroughs, (el) => {
				return el.code === targetCode;
			}));
		});
	});
}

export function drawCirclesMap(p, vm){
	p.push();
	p.translate(p.width/2, p.height/2);
	p.textAlign(p.CENTER);

	boroughs.forEach((borough) => {
		borough.update();
	});

	boroughs.forEach((borough) => {
		borough.draw();
	});

	p.pop();
}

export function mouseMovedCirclesMap(p, vm){
	for(const borough of boroughs){
		const distance = borough.position.dist(p.createVector(p.mouseX-p.width/2, p.mouseY-p.height/2)) - borough.radius/2;

		if(distance < 0){
			vm.$store.commit("setCurrentArea", borough.code);
			break;
		}

		vm.$store.commit("setCurrentArea", "");
	}
}

class Borough{
	constructor(name, code, cases, p, vm){
		this.name = name;
		this.code = code;
		this.p = p;
		this.vm = vm;

		this.cases = cases;
		this.radius = 0;
		this.position = p.createVector(p.random(-1, 1), p.random(-1, 1));
		this.velocity = p.createVector(0, 0);
		this.related = [];
		this.color = p.color(255, 100);
	}

	inward(){
		return this.p.createVector(
			-this.position.x,
			-this.position.y
		).setMag(1);
	}

	update(){
		let currentDate = moment(this.vm.minDate).add(this.vm.$store.getters.wholeCurrentDay, "days").format("YYYY-MM-DD");
		let totalCases = this.vm.byArea[this.code][currentDate].totalCases;
		this.radius = this.p.map(
			totalCases,
			0, this.vm.maxTotalCases,
			0, 200
		);
		this.color = this.p.lerpColor(
			this.p.color("#27D99999"),
			this.p.color("#8C240D99"),
			this.vm.byArea[this.code][currentDate].newCases / this.vm.maxNewCases
		);

		this.velocity.setMag(0);
		boroughs.forEach((borough) => {
			if(this.code !== borough.code){
				const distance = this.position.dist(borough.position) * 2 - (this.radius + borough.radius);

				if(distance < 0){
					// Overlapping
					this.velocity.add(
						this.p.createVector(
							this.position.x - borough.position.x,
							this.position.y - borough.position.y
						).setMag(Math.floor(this.p.map(
							Math.abs(distance),
							0, 200,
							1.25, 5
						)))
					);
				}
			}
		});

		let inward = true;
		boroughs.forEach((borough) => {
			const distance = this.position.dist(borough.position) * 2 - (this.radius + borough.radius);
			if(distance > 0 && distance < 5){
				inward = false;
			}
		});

		if(inward){
			this.velocity.add(this.inward()
				.setMag(
					this.p.map(
						this.position.dist(this.p.createVector(0, 0)),
						0, 100,
						0, 1,
						true
					)
				)
			);
		}

		if(this.velocity.mag() < 0.5){
			this.velocity.setMag(0);
		}
		this.position.add(this.velocity);
	}

	draw(){
		this.p.fill(this.color);
		if(this.vm.$store.state.currentArea === this.code){
			this.p.strokeWeight(3);
			this.p.stroke("#ffffff");
		}else{
			this.p.noStroke();
		}
		this.p.circle(this.position.x, this.position.y, this.radius);
	}

	linkBorough(targetBorough){
		this.related.push(targetBorough);
	}
}