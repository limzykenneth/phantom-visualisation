import Vue from "vue";
import App from "./App.vue";

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
			covid: data
		};
	};

	new Vue({
		el: "#page-content",
		render: function(createElement){
			return createElement(App);
		}
	});
})();