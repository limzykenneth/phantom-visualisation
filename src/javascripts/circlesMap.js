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
		this.position = p.createVector(p.random(-100, 100), p.random(-100, 100));
		this.velocity = p.createVector(0, 0);
		this.acceleration = p.createVector(0, 0);
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

		this.acceleration.setMag(0);
		this.related.forEach((borough) => {
			const distance = this.position.dist(borough.position) - (this.radius + borough.radius);
			const direction = this.p.createVector(
				this.position.x - borough.position.x,
				this.position.y - borough.position.y
			).setMag(
				this.p.map(distance, -10, 10, 1, -1, true) / this.related.length
			);
			this.acceleration.add(direction);
		});

		// Acceleration
		this.velocity.add(this.acceleration);
		this.velocity.add(this.inward());
		// Position
		this.position.add(this.velocity);
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