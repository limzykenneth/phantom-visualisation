<template>
	<div id="controls-container">
		<input type="range" name="date" id="date-picker" step=1 min=0
			:max="numberOfDays-1"
			v-model="day"
		>
		<div id="playback-container">
			<button class="buttons" id="pause-button"
				v-on:click="togglePlayState"
			>
				<i class="material-icons md-18">{{ playbackIcon }}</i>
			</button>
		</div>

		<div id="selection-container">
			<select id="area-selection"
				v-model="selectedArea"
			>
				<option value="" selected></option>
				<option
					v-for="(area_name, area_code) in boroughs"
					:value="area_code"
				>{{ area_name }}</option>
			</select>
		</div>
	</div>
</template>

<script>
export default{
	name: "AppControls",
	props: {
		minDate: {
			type: Object,
			required: true
		},
		maxDate: {
			type: Object,
			required: true
		},
		numberOfDays: {
			type: Number,
			required: true
		},
		boroughs: {
			type: Object,
			required: true
		}
	},
	computed: {
		day: {
			get: function(){
				return this.$store.getters.wholeCurrentDay;
			},
			set: function(value){
				this.$store.commit("setCurrentDay", parseInt(value));
			}
		},
		selectedArea: {
			get: function(){
				return this.$store.state.currentArea;
			},
			set: function(value){
				this.$store.commit("setCurrentArea", value);
			}
		},
		playbackIcon: function(){
			if(this.$store.state.playState === "pause"){
				return "play_arrow";
			}else if(this.$store.state.playState === "play"){
				return "pause";
			}else{
				return "";
			}
		}
	},
	methods: {
		playTimeline: function(){
			this.$store.commit("setPlayState", "play");
		},
		pauseTimeline: function(){
			this.$store.commit("setPlayState", "pause");
		},
		togglePlayState: function(){
			if(this.$store.state.playState === "play"){
				this.$store.commit("setPlayState", "pause");
			}else if(this.$store.state.playState === "pause"){
				this.$store.commit("setPlayState", "play");
			}
		}
	}
};
</script>

<style lang="less" scoped>
@import "../stylesheets/range.less";

#controls-container{
	position: absolute;
	left: 0;
	top: 0;

	#date-picker{
		.custom-range-input(#aaa, #fff);
	}

	#playback-container{
		.buttons{
			cursor: pointer;

			.material-icons{
				display: block;
			}
		}
	}
}
</style>