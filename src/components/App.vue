<template>
	<main id="page-content">
		<app-canvas
			:boroughs="boroughs"
			:by-date="byDate"
			:by-area="byArea"
			:covid="covid"
			:min-date="minDate"
			:max-date="maxDate"
			:number-of-days="numberOfDays"
			:number-of-boroughs="numberOfBoroughs"
		></app-canvas>
		<app-controls
			:min-date="minDate"
			:max-date="maxDate"
			:number-of-days="numberOfDays"
			:boroughs="boroughs"
		></app-controls>
	</main>
</template>

<script>
import AppCanvas from "./Canvas.vue";
import AppControls from "./Controls.vue";

export default{
	name: "App",
	components: {
		"app-canvas": AppCanvas,
		"app-controls": AppControls
	},
	created: function(){
		this.$store.commit("setNumberOfDays", this.numberOfDays);
	}
};
</script>

<style lang="less" scoped>

</style>