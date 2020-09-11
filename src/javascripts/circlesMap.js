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

class Borough{
	constructor(name, code, cases, p, vm){
		this.name = name;
		this.code = code;
		this.p = p;
		this.vm = vm;

		this.cases = cases;
		this.radius = 0;
		this.position = p.createVector(p.random(-1, 1), p.random(-1, 1));
		this.related = [];
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
			5, 200
		);

		boroughs.forEach((borough) => {
			if(this.code !== borough.code){
				const distance = this.position.dist(borough.position) * 2 - (this.radius + borough.radius);

				if(distance < 2){
					// Overlapping
					this.position.add(
						this.p.createVector(
							this.position.x - borough.position.x,
							this.position.y - borough.position.y
						).setMag(this.p.map(
							Math.abs(distance),
							0, 200,
							2, 50,
							true
						))
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
			this.position.add(this.inward()
				.setMag(
					this.p.map(
						this.position.dist(this.p.createVector(0, 0)),
						0, 100,
						0, 5,
						true
					)
				)
			);
		}
	}

	draw(){
		this.p.fill(255, 50);
		this.p.noStroke();
		this.p.circle(this.position.x, this.position.y, this.radius);

		// this.p.fill(0);
		// this.p.stroke(255);
		// this.p.text(this.name, this.x, this.y);
	}

	linkBorough(targetBorough){
		this.related.push(targetBorough);
	}
}