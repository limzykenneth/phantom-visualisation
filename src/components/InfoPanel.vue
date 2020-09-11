<template>
	<section id="info-container">
		<p>Borough: {{ currentArea || "Greater London" }}</p>
		<p>Date: {{ currentDate.format("Do MMMM YYYY") }}</p>
		<p>New cases: {{ newCases !== false ? newCases : allNewCases }}</p>
		<p>Total cases: {{ totalCases !== false ? totalCases : allTotalCases }}</p>
	</section>
</template>

<script>
export default{
	name: "InfoPanel",
	props: {
		boroughs: {
			type: Object,
			required: true
		},
		minDate: {
			type: Object,
			required: true
		},
		byDate: {
			type: Object,
			required: true
		},
		byArea: {
			type: Object,
			required: true
		}
	},
	computed: {
		currentArea: function(){
			const areaCode = this.$store.state.currentArea;
			return this.boroughs[areaCode];
		},
		currentDate: function(){
			return moment(this.minDate)
				.add(this.$store.getters.wholeCurrentDay, "days");
		},
		totalCases: function(){
			const areaCode = this.$store.state.currentArea;
			if(areaCode === ""){
				return false;
			}else{
				return this.byArea[areaCode][this.currentDate.format("YYYY-MM-DD")].totalCases;
			}
		},
		allTotalCases: function(){
			return _.reduce(this.byArea, (acc, borough) => {
				acc += parseInt(borough[this.currentDate.format("YYYY-MM-DD")].totalCases);

				return acc;
			}, 0);
		},
		newCases: function(){
			const areaCode = this.$store.state.currentArea;
			if(areaCode === ""){
				return false;
			}else{
				return this.byArea[areaCode][this.currentDate.format("YYYY-MM-DD")].newCases;
			}
		},
		allNewCases: function(){
			return _.reduce(this.byArea, (acc, borough) => {
				acc += parseInt(borough[this.currentDate.format("YYYY-MM-DD")].newCases);

				return acc;
			}, 0);
		}
	}
};
</script>

<style lang="less" scoped>
#info-container{
	position: fixed;
	left: 0;
	bottom: 0;
	color: white;
}
</style>