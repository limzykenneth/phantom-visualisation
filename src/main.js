import Vue from "vue";
import App from "./App.vue";
import store from "./store.js";

(async function(){
	const {data} = await new Promise((resolve, reject) => {
		Papa.parse("./data/phe_cases_london_boroughs.csv", {
			header: true,
			download: true,
			complete: (result) => {
				resolve(result);
			},
			error: (err) => {
				reject(err);
			}
		});
	});

	App.data = function(){
		return {
			covid: data.filter(entry => !!entry.area_code)
		};
	};

	App.computed = {
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
	};

	new Vue({
		el: "#page-content",
		store: store,
		render: function(createElement){
			return createElement(App);
		}
	});
})();