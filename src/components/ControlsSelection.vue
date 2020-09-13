<template>
	<div id="selection-container"
		v-on:mouseleave="collapseDates"
	>
		<div class="panel">
			<div id="collapse-button"
				v-on:click="toggleCollapse"
			>
				<i class="material-icons md-18">{{ collapsedIcon }}</i> <span>Areas</span>
			</div>
			<ul id="area-selector"
				:class="selectionCollapsed ? 'collapsed' : ''"
			>
				<li class="area"
					:class="(selectedArea === '' || highlightedArea === '') ? 'active' : ''"

					v-on:click="selectArea('')"
					v-on:mouseenter="expandDates('')"
				>Greater London</li>
				<li class="area"
					v-for="(area_name, area_code) in boroughs"
					:class="(area_code === selectedArea || highlightedArea === area_code) ? 'active' : ''"

					v-on:click="selectArea(area_code)"
					v-on:mouseenter="expandDates(area_code)"
				>{{ area_name }}</li>
			</ul>
		</div>

		<div class="panel">
			<date-selection
				v-if="!datesCollapsed"
				:min-date="minDate"
				:number-of-days="numberOfDays"
				:highlighted-area="highlightedArea"

				v-on:expandDates="expandDates"
			></date-selection>
		</div>
	</div>
</template>

<script>
import DateSelection from "./ControlsSelectionDate.vue";

export default{
	name: "ControlsSelection",
	components: {
		"date-selection": DateSelection
	},
	props: {
		boroughs: {
			type: Object,
			required: true
		},
		minDate: {
			type: Object,
			required: true
		},
		numberOfDays: {
			type: Number,
			required: true
		}
	},
	data: function(){
		return {
			selectionCollapsed: true,
			datesCollapsed: true,
			highlightedArea: null
		};
	},
	computed: {
		selectedArea: {
			get: function(){
				return this.$store.state.currentArea;
			},
			set: function(value){
				this.$store.commit("setCurrentArea", value);
			}
		},
		collapsedIcon: function(){
			if(this.selectionCollapsed){
				return "arrow_right";
			}else{
				return "arrow_drop_down";
			}
		}
	},
	methods: {
		toggleCollapse: function(){
			this.selectionCollapsed = !this.selectionCollapsed;
			if(this.selectionCollapsed){
				this.datesCollapsed = true;
			}
		},
		selectArea: function(area_code){
			this.$store.commit("setCurrentArea", area_code);
		},
		expandDates: function(area_code){
			this.datesCollapsed = false;
			this.highlightedArea = area_code;
		},
		collapseDates: function(){
			this.datesCollapsed = true;
			this.highlightedArea = null;
		}
	}
};
</script>

<style lang="less">
@import "../stylesheets/mixin.less";

#selection-container{
	position: absolute;
	max-height: ~"calc(100% - 100px)";
	right: 0;
	top: 0;
	margin: 10px;
	padding: 10px;
	margin-top: 0;
	padding-top: 0;
	margin-right: 0;
	padding-right: 0;
	display: flex;
	flex-direction: row-reverse;

	@media screen and (max-width: 600px){
		width: 100%;
		padding-left: 0;
		pointer-events: initial;
		display: block;
	}

	.panel{
		@media screen and (max-width: 600px){
			max-height: ~"calc(100vh - 100px)";
		}

		#collapse-button{
			padding: 10px;
			border: 1px solid white;
			cursor: pointer;
			display: flex;
			align-items: center;
			background: black;
			z-index: 10;
			position: fixed;
			min-width: 15rem;
			pointer-events: initial;

			@media screen and (max-width: 600px){
				width: 100%;
			}
		}

		#area-selector{
			.selection-list();

			transform: translateY(45px);
			transition: transform 0.5s ease;
			z-index: 0;
			min-width: 15rem;

			&.collapsed{
				pointer-events: none;
				transform: translateY(~"calc(-100% - 50px)");
			}

			@media screen and (max-width: 600px){
				padding-bottom: 50px;
				max-height: 100vh;
			}

			.area{
				.selection-list-item();

				@media screen and (max-width: 600px){
					background: rgba(0, 0, 0, 1);

					&:hover{
						background: rgba(0, 0, 0, 1);
					}

					&.active{
						background: rgba(100, 100, 100, 1);
					}
				}
			}
		}
	}
}
</style>