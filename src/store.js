import Vuex from "vuex";

export default new Vuex.Store({
	state: {
		currentDay: 1,
		currentArea: null
	},
	mutations: {
		setCurrentDay: function(state, day){
			state.currentDay = day;
		},
		incrementCurrentDay: function(state){
			state.currentDay++;
		},
		decrementCurrentDay: function(state){
			state.currentDay--;
		},
		setCurrentArea: function(state, area){
			state.currentArea = area;
		}
	}
});