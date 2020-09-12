import Vue from "vue";
import App from "./components/App.vue";
import store from "./javascripts/store.js";

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

	new Vue({
		el: "#page-content",
		store: store,
		data: function(){
			return {
				covid: data.filter(entry => !!entry.area_code)
			};
		},
		render: function(createElement){
			return createElement(App, {
				props: {
					covid: this.covid
				}
			});
		}
	});
})();