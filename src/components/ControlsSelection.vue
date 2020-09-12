<template>
	<div id="selection-container">
		<div id="collapse-button"
			v-on:click="toggleCollapse"
		>
			<i class="material-icons md-18">{{ collapsedIcon }}</i> <span>Areas</span>
		</div>
		<ul id="area-selector"
			:class="selectionCollapsed ? 'collapsed' : ''"
		>
			<li class="area"
				:class="selectedArea === '' ? 'active' : ''"
				v-on:click="selectArea('')"
			>Greater London</li>
			<li class="area"
				v-for="(area_name, area_code) in boroughs"
				:class="area_code === selectedArea ? 'active' : ''"
				v-on:click="selectArea(area_code)"
			>{{ area_name }}</li>
		</ul>
	</div>
</template>

<script>
export default{
	name: "ControlsSelection",
	props: {
		boroughs: {
			type: Object,
			required: true
		}
	},
	data: function(){
		return {
			selectionCollapsed: true
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
		},
		selectArea: function(area_code){
			this.$store.commit("setCurrentArea", area_code);
		}
	}
};
</script>

<style lang="less">
#selection-container{
	overflow: scroll;
	position: absolute;
	right: 0;
	top: 0;
	max-height: ~"calc(100% - 100px)";
	margin: 10px;
	padding: 10px;
	margin-top: 0;
	padding-top: 0;
	margin-right: 0;
	padding-right: 0;

	@media screen and (max-width: 600px){
		pointer-events: initial;
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
		list-style: none;
		margin: 0px;
		padding: 0px;
		transform: translateY(45px);
		transition: transform 0.5s ease;
		z-index: 0;
		position: relative;
		min-width: 15rem;
		pointer-events: initial;

		&.collapsed{
			pointer-events: none;
			transform: translateY(~"calc(-100% - 50px)");
		}

		@media screen and (max-width: 600px){
			padding-bottom: 50px;
		}

		.area{
			padding: 10px;
			border: 1px solid white;
			cursor: pointer;

			&:hover, &.active{
				background: rgba(255, 255, 255, 0.25);
			}

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

	@media screen and (max-width: 600px){
		width: 100%;
		padding-left: 0;
	}
}
</style>