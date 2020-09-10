<template>
	<div id="controls-container">
		<input type="range" name="date" id="date-picker" step=1 min=0
			:max="numberOfDays-1"
			v-model="day"
		>
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
		}
	},
	computed: {
		day: {
			get: function(){
				return this.$store.state.currentDay;
			},
			set: function(value){
				this.$store.commit("setCurrentDay", value);
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
}
</style>