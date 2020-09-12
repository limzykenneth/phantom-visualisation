<template>
	<section id="info-container">
		<table id="info-table">
			<tr>
				<td class="label">Borough</td>
				<td class="data">{{ currentArea || "Greater London" }}</td>
			</tr>
			<tr>
				<td class="label">Date</td>
				<td class="data">{{ currentDate.format("Do MMMM YYYY") }}</td>
			</tr>
			<tr>
				<td class="label">New Cases</td>
				<td class="data">{{ newCases !== false ? newCases : allNewCases }}</td>
			</tr>
			<tr>
				<td class="label">Total Cases</td>
				<td class="data">{{ totalCases !== false ? totalCases : allTotalCases }}</td>
			</tr>
		</table>
	</section>
</template>

<script>
export default{
	name: "InfoPanel",
	props: {
		boroughs: {
			type: Object,
			required: true
		},
		minDate: {
			type: Object,
			required: true
		},
		byDate: {
			type: Object,
			required: true
		},
		byArea: {
			type: Object,
			required: true
		}
	},
	computed: {
		currentArea: function(){
			const areaCode = this.$store.state.currentArea;
			return this.boroughs[areaCode];
		},
		currentDate: function(){
			return moment(this.minDate)
				.add(this.$store.getters.wholeCurrentDay, "days");
		},
		totalCases: function(){
			const areaCode = this.$store.state.currentArea;
			if(areaCode === ""){
				return false;
			}else{
				return this.byArea[areaCode][this.currentDate.format("YYYY-MM-DD")].totalCases;
			}
		},
		allTotalCases: function(){
			return _.reduce(this.byArea, (acc, borough) => {
				acc += parseInt(borough[this.currentDate.format("YYYY-MM-DD")].totalCases);

				return acc;
			}, 0);
		},
		newCases: function(){
			const areaCode = this.$store.state.currentArea;
			if(areaCode === ""){
				return false;
			}else{
				return this.byArea[areaCode][this.currentDate.format("YYYY-MM-DD")].newCases;
			}
		},
		allNewCases: function(){
			return _.reduce(this.byArea, (acc, borough) => {
				acc += parseInt(borough[this.currentDate.format("YYYY-MM-DD")].newCases);

				return acc;
			}, 0);
		}
	}
};
</script>

<style lang="less" scoped>
#info-container{
	position: fixed;
	left: 0;
	top: 0;
	color: white;
	margin: 20px;
	margin-left: 0;
	margin-top: 0;

	#info-table{
		table-layout: fixed;
		border: 1px solid white;
		border-collapse: collapse;

		td{
			padding: 10px;
			border: 1px solid white;
		}

		.label{

		}

		.data{
			min-width: 15rem;
		}
	}

	@media screen and (max-width: 600px){
		display: none;
	}
}
</style>