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
			:number-of-days="numberOfDays"
			:boroughs="boroughs"
			:min-date="minDate"
		></app-controls>

		<info-panel
			:boroughs="boroughs"
			:min-date="minDate"
			:by-date="byDate"
			:by-area="byArea"
		></info-panel>
	</main>
</template>

<script>
import AppCanvas from "./Canvas.vue";
import AppControls from "./Controls.vue";
import InfoPanel from "./InfoPanel.vue";

export default{
	name: "App",
	components: {
		"app-canvas": AppCanvas,
		"app-controls": AppControls,
		"info-panel": InfoPanel
	},
	props: {
		covid: {
			type: Array,
			required: true
		}
	},
	computed: {
		boroughs: function(){
			return _.reduce(this.covid, (acc, entry) => {
				if(typeof acc[entry.area_code] === "undefined"){
					acc[entry.area_code] = entry.area_name;
				}
				return acc;
			}, {});
		},
		byDate: function(){
			return _.reduce(this.covid, (acc, entry) => {
				if(typeof acc[entry.date] === "undefined"){
					acc[entry.date] = {};
				}

				acc[entry.date][entry.area_code] = {
					newCases: entry.new_cases,
					totalCases: entry.total_cases
				};

				return acc;
			}, {});
		},
		byArea: function(){
			return _.reduce(this.covid, (acc, entry) => {
				if(typeof acc[entry.area_code] === "undefined"){
					acc[entry.area_code] = {};
				}

				acc[entry.area_code][entry.date] = {
					newCases: entry.new_cases,
					totalCases: entry.total_cases
				};

				return acc;
			}, {});
		},
		minDate: function(){
			return _.reduce(this.covid, (val, entry) => {
				const date = moment(entry.date, "YYYY-MM-DD");
				if(date.isBefore(val)){
					val = date;
				}

				return val;
			}, moment("2020-12-31", "YYYY-MM-DD"));
		},
		maxDate: function(){
			return _.reduce(this.covid, (val, entry) => {
				const date = moment(entry.date, "YYYY-MM-DD");
				if(date.isAfter(val)){
					val = date;
				}

				return val;
			}, moment("2020-01-01", "YYYY-MM-DD"));
		},
		numberOfDays: function(){
			return this.maxDate.diff(this.minDate, "days") + 1;
		},
		numberOfBoroughs: function(){
			return _.size(this.boroughs);
		}
	},
	created: function(){
		this.$store.commit("setNumberOfDays", this.numberOfDays);
	}
};
</script>