let boroughs = [];

export function initCirclesMap(p, vm){
	boroughs = _.map(vm.boroughs, (area_name, area_code) => {
		return new Borough(area_name, area_code, vm.byArea[area_code], p, vm);
	});
}

export function drawCirclesMap(p, vm){
	p.push();
	p.translate(p.width/2, p.height/2);
	p.textAlign(p.CENTER);

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
		this.x = p.random(-p.width/2, p.width/2);
		this.y = p.random(-p.height/2, p.height/2);
	}

	draw(){
		// Update
		let currentDate = moment(this.vm.minDate).add(this.vm.$store.getters.wholeCurrentDay, "days").format("YYYY-MM-DD");
		let totalCases = this.vm.byArea[this.code][currentDate].totalCases;
		this.radius = this.p.map(
			totalCases,
			0, this.vm.maxTotalCases,
			5, 200
		);

		// Draw
		this.p.fill(255, 50);
		this.p.noStroke();
		this.p.circle(this.x, this.y, this.radius);

		// this.p.fill(0);
		// this.p.stroke(255);
		// this.p.text(this.name, this.x, this.y);
	}
}