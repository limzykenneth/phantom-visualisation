let boroughs = [];

export function initCirclesConcentric(p, vm){
	boroughs = _.map(vm.boroughs, (area_name, area_code) => {
		return new Borough(area_name, area_code, p, vm);
	});
}

export function drawCirclesConcentric(p, vm){
	p.push();
	p.translate(p.width/2, p.height/2);
	p.textAlign(p.CENTER);

	let accRadius = 0;
	boroughs.forEach((borough) => {
		accRadius = borough.update(accRadius);
	});

	const sortedBoroughs = _.sortBy(boroughs, (borough) => {
		return -borough.accRadius;
	});
	sortedBoroughs.forEach((borough) => {
		borough.draw();
	});

	p.pop();
}

class Borough{
	constructor(name, code, p, vm){
		this.name = name;
		this.p = p;
		this.vm = vm;
		this.code = code;
		this.radius = 0;
		this.accRadius = 0;
		this.x = 0;
		this.y = 0;
		this.color = p.color(255, 10);
	}

	update(accRadius){
		let currentDate = moment(this.vm.minDate).add(this.vm.$store.getters.wholeCurrentDay, "days").format("YYYY-MM-DD");
		let totalCases = this.vm.byArea[this.code][currentDate].totalCases;
		this.radius = this.p.map(
			totalCases,
			0, this.vm.maxTotalCases,
			5, 50
		);
		this.accRadius = accRadius + this.radius;
		return this.accRadius;
	}

	draw(){
		this.p.fill(this.color);
		this.p.noStroke();
		this.p.circle(this.x, this.y, this.accRadius);

		// this.p.fill(0);
		// this.p.stroke(255);
		// this.p.text(this.name, this.x, this.y);
	}
}