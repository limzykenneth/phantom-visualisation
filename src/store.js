import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		currentDay: 0,
		currentArea: null,
		playState: "pause"
	},
	getters: {
		wholeCurrentDay: function(state){
			return Math.max(
				Math.min(
					Math.floor(state.currentDay),
					128
				),
				0
			);
		}
	},
	mutations: {
		setCurrentDay: function(state, day){
			state.currentDay = day;
		},
		incrementCurrentDay: function(state, increment=1){
			if(Math.floor(state.currentDay + increment) <= 128){
				state.currentDay += increment;
				state.currentDay = Math.min(state.currentDay, 128);
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