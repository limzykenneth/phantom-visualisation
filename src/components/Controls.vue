<template>
	<div id="controls-container">
		<controls-playback
			:number-of-days="numberOfDays"
		></controls-playback>

		<controls-selection
			:boroughs="boroughs"
			:min-date="minDate"
			:number-of-days="numberOfDays"
		></controls-selection>
	</div>
</template>

<script>
import ControlsPlayback from "./ControlsPlayback.vue";
import ControlsSelection from "./ControlsSelection.vue";

export default{
	name: "AppControls",
	components: {
		"controls-playback": ControlsPlayback,
		"controls-selection": ControlsSelection
	},
	props: {
		numberOfDays: {
			type: Number,
			required: true
		},
		boroughs: {
			type: Object,
			required: true
		},
		minDate: {
			type: Object,
			required: true
		}
	}
};
</script>

<style lang="less" scoped>
#controls-container{
	position: absolute;
	left: 0;
	top: 0;
	z-index: 5;
	width: 100%;
	height: 100%;
	pointer-events: none;
	color: white;
}
</style>