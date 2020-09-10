import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		currentDay: 0,
		currentArea: "",
		playState: "pause",
		numberOfDays: 0
	},
	getters: {
		wholeCurrentDay: function(state){
			return Math.max(
				Math.min(
					Math.floor(state.currentDay),
					state.numberOfDays
				),
				0
			);
		}
	},
	mutations: {
		setNumberOfDays: function(state, days){
			state.numberOfDays = days;
		},
		setCurrentDay: function(state, day){
			state.currentDay = day;
		},
		incrementCurrentDay: function(state, increment=1){
			if(Math.floor(state.currentDay + increment) <= state.numberOfDays){
				state.currentDay += increment;
				state.currentDay = Math.min(state.currentDay, state.numberOfDays);
			}
		},
		decrementCurrentDay: function(state, decrement=1){
			if(Math.ceil(state.currentDay - decrement) >= 0){
				state.currentDay -= decrement;
				state.currentDay = Math.max(state.currentDay, 0);
			}
		},
		setCurrentArea: function(state, area){
			state.currentArea = area;
		},
		setPlayState: function(state, playState){
			state.playState = playState;
		}
	}
});