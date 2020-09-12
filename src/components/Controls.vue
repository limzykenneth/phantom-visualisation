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
			<!-- <select id="area-selection"
				v-model="selectedArea"
			>
				<option value="" selected></option>
				<option
					v-for="(area_name, area_code) in boroughs"
					:value="area_code"
				>{{ area_name }}</option>
			</select> -->

			<ul id="area-selector">
				<li class="area"
					v-for="(area_name, area_code) in boroughs"
					:class="area_code === selectedArea ? 'active' : ''"
					v-on:click="selectArea(area_code)"
				>{{ area_name }}</li>
			</ul>
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
		},
		selectArea: function(area_code){
			this.$store.commit("setCurrentArea", area_code);
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
	z-index: 5;
	width: 100%;
	height: 100%;

	#date-picker{
		.custom-range-input(#aaa, #fff);

		position: relative;
		left: 50%;
		transform: translateX(-50%);
		width: 90%;
	}

	#playback-container{
		.buttons{
			cursor: pointer;

			.material-icons{
				display: block;
			}
		}
	}

	#selection-container{
		overflow: scroll;
		position: absolute;
		right: 0;
		bottom: 0;
		max-height: 90%;
		margin: 10px;
		padding: 10px;
		// border: 1px solid white;

		#area-selector{
			color: white;
			list-style: none;
			margin: 0px;
			padding: 0px;

			.area{
				padding: 10px;
				border: 1px solid white;
				cursor: pointer;

				&:hover, &.active{
					background: rgba(255, 255, 255, 0.25);
				}
			}
		}
	}
}
</style>