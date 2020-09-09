<template>
	<main id="page-content">
		<app-canvas></app-canvas>
		<app-controls></app-controls>
	</main>
</template>

<script>
import AppCanvas from "./components/Canvas.vue";
import AppControls from "./components/Controls.vue";

export default{
	name: "App",
	components: {
		"app-canvas": AppCanvas,
		"app-controls": AppControls
	}
};
</script>

<style lang="less" scoped>

</style>