<template>
	<section id="info-container">
		<p>Borough: {{ currentArea }}</p>
		<p>Date: {{ currentDate.format("Do MMMM YYYY") }}</p>
		<p>New cases: {{ newCases }}</p>
		<p>Total cases: {{ totalCases }}</p>
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
				return "";
			}else{
				return this.byArea[areaCode][this.currentDate.format("YYYY-MM-DD")].totalCases;
			}
		},
		newCases: function(){
			const areaCode = this.$store.state.currentArea;
			if(areaCode === ""){
				return "";
			}else{
				return this.byArea[areaCode][this.currentDate.format("YYYY-MM-DD")].newCases;
			}
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