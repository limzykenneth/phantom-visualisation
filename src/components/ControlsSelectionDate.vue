<template>
	<ul id="date-selector">
		<li class="date"
			v-for="(date, i) in dates"
			:key="i"

			v-on:click="selectDate(date)"
		>{{ date.format("Do MMMM YYYY") }}</li>
	</ul>
</template>

<script>
export default{
	name: "DateSelection",
	props: {
		minDate: {
			type: Object,
			required: true
		},
		numberOfDays: {
			type: Number,
			required: true
		},
		highlightedArea: {
			type: String,
			required: true
		}
	},
	computed: {
		dates: function(){
			let dates = [];

			for(let i=0; i<this.numberOfDays; i++){
				dates.push(moment(this.minDate)
					.add(i, "days")
				);
			}

			return dates;
		}
	},
	methods: {
		selectDate: function(date){
			this.$store.commit("setCurrentArea", this.highlightedArea);
			this.$store.commit("setCurrentDay", date.diff(this.minDate, "days"));
		}
	}
};
</script>

<style lang="less">
@import "../stylesheets/mixin.less";

#date-selector{
	.selection-list();

	margin-top: 45px;
	min-width: 12rem;
	z-index: 15;
	display: flex;
	flex-direction: column;

	@media screen and (max-width: 600px){
		display: none;
	}

	.date{
		.selection-list-item();
	}
}
</style>