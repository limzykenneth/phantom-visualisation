<template>
	<div id="playback-container">
		<button class="buttons" id="pause-button"
			v-on:click="togglePlayState"
		>
			<i class="material-icons md-18">{{ playbackIcon }}</i>
		</button>

		<input type="range" name="date" id="date-picker" step=1 min=0
			:max="numberOfDays-1"
			v-model="day"
		>
	</div>
</template>

<script>
export default{
	name: "ControlsPlayback",
	props: {
		numberOfDays: {
			type: Number,
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

#playback-container{
	position: absolute;
	bottom: 0;
	width: 100%;
	max-width: 100vw;
	height: 90px;
	padding: 20px;
	pointer-events: initial;
	display: flex;
	align-items: center;
	justify-content: space-between;

	.buttons{
		cursor: pointer;
		background: none;
		color: white;
		border: 1px solid white;
		padding: 10px 20px;

		&:active{
			background: rgba(255, 255, 255, 0.25);
		}

		&#pause-button{
			margin-right: 20px;
		}

		.material-icons{
			display: block;
		}
	}

	#date-picker{
		.custom-range-input(#000, #000);

		position: relative;
		pointer-events: initial;
		flex-grow: 2;
	}
}
</style>